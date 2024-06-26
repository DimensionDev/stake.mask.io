import { Box, BoxProps, HStack, Icon, Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { memo, useMemo, useState } from 'react'
import { formatUnits, TransactionExecutionError, UserRejectedRequestError } from 'viem'
import { useAccount, useChainId, useConfig, useReadContract, useSwitchChain, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from 'wagmi/actions'

import { StakeManagerABI } from '@/abis/stakeManager.ts'
import Question from '@/assets/question.svg?react'
import { MaskStakingButton } from '@/components/MaskStakingButton.tsx'
import { ProgressiveText } from '@/components/ProgressiveText.tsx'
import { Tooltip } from '@/components/Tooltip.tsx'
import { TxToastDescription } from '@/components/TxToastDescription.tsx'
import { UnstakeRequirementBoundary } from '@/components/UnstakeRequirementBoundary/index.tsx'
import { ActionCard } from '@/components/UserStatus/ActionCard'
import { useHasUnstaked } from '@/components/UserStatus/useHasUnstaked.ts'
import { ZERO } from '@/constants/misc.ts'
import { formatMarketCap } from '@/helpers/formatMarketCap.ts'
import { formatNumber } from '@/helpers/formatNumber.ts'
import { resolveTxLink } from '@/helpers/resolveTxLink.ts'
import { useHandleError } from '@/hooks/useHandleError.ts'
import { usePoolInfo } from '@/hooks/usePoolInfo.ts'
import { usePoolState } from '@/hooks/usePoolState.ts'
import { useToast } from '@/hooks/useToast.tsx'
import { useUserInfo } from '@/hooks/useUserInfo.ts'
import { resultModal } from '@/modals/ResultModal.tsx'
import { usePoolStore } from '@/store/poolStore.ts'

export const StakedMask = memo(function StakedMask(props: BoxProps) {
  const config = useConfig()
  const account = useAccount()
  const currentChainId = useChainId()
  const { chainId, stakeManagerAddress } = usePoolStore()
  const { data: poolInfo } = usePoolInfo()
  const { isEnded, isLoadingPools } = usePoolState(poolInfo)
  const { data: userInfo, isLoading: loadingUserInfo } = useUserInfo()
  const {
    isLoading: isReadingUserInfos,
    data: chainData,
    refetch,
  } = useReadContract({
    chainId,
    abi: StakeManagerABI,
    address: stakeManagerAddress,
    functionName: 'userInfos',
    args: account.address ? [account.address] : undefined,
  })

  const { data: hasUnstaked, isLoading: checkingUnstakedStatus, refetch: recheckUnstake } = useHasUnstaked()
  const staked = useMemo(() => {
    if (hasUnstaked) return 0
    if (chainData) {
      return Math.max(+formatUnits(chainData[0], 18), userInfo?.amount || 0)
    }
    return userInfo?.amount
  }, [hasUnstaked, chainData, userInfo?.amount])
  const ratio = userInfo?.address_type === '1' ? 1.05 : 1

  const [waiting, setWaiting] = useState(false)
  const { switchChainAsync, isPending: isSwitchingChain } = useSwitchChain()
  const { writeContractAsync, isPending: isWithdrawing } = useWriteContract()
  const toast = useToast({ title: t`Unstake` })
  const handleError = useHandleError()

  const isZero = chainData?.[0] ? chainData[0] === ZERO : true
  const loading = isWithdrawing || waiting || isReadingUserInfos || isSwitchingChain || checkingUnstakedStatus
  const disabled = isZero
  const pendingStakingNumbers = isReadingUserInfos || loadingUserInfo || isLoadingPools
  return (
    <ActionCard title={t`Staked MASK`} display="flex" flexDir="column" {...props}>
      <Stack alignItems="center" flexGrow={1}>
        <ProgressiveText
          loading={pendingStakingNumbers}
          fontSize={48}
          lineHeight="56px"
          fontWeight={700}
          skeletonProps={{
            rounded: '4px',
            w: '100px',
            h: '36px',
            my: '10px',
          }}
        >
          {staked ? formatMarketCap(staked, 4) : 0}
        </ProgressiveText>
        <HStack alignItems="center" my="auto">
          <Trans>
            <ProgressiveText
              as="div"
              loading={pendingStakingNumbers}
              skeletonProps={{ h: '20px', w: '30px', rounded: '4px' }}
            >
              {`+${isEnded ? 0 : userInfo?.score_per_hour}`}
            </ProgressiveText>
            Points/h
          </Trans>
          <Tooltip label={t`1 staked MASK will generate ${ratio} point per hour.`} placement="top" hasArrow>
            <Box as="span" w={6} h={6} cursor="pointer">
              <Icon as={Question} w="initial" h="initial" />
            </Box>
          </Tooltip>
        </HStack>
        <UnstakeRequirementBoundary>
          <MaskStakingButton
            isDisabled={disabled}
            isLoading={loading}
            disabledIcon={hasUnstaked}
            onClick={async () => {
              if (!chainData?.[0]) return
              try {
                if (currentChainId !== chainId) {
                  await switchChainAsync({ chainId })
                }
                toast({
                  status: 'loading',
                  description: t`Confirm this transaction in your wallet.`,
                })
                const hash = await writeContractAsync({
                  abi: StakeManagerABI,
                  address: stakeManagerAddress,
                  functionName: 'withdraw',
                  args: [chainData[0]],
                })
                const txLink = resolveTxLink(chainId, hash)
                toast({
                  status: 'loading',
                  description: <TxToastDescription link={txLink} text={t`Transaction submitted!`} color="primary.4" />,
                })

                setWaiting(true)
                const receipt = await waitForTransactionReceipt(config, {
                  hash,
                  confirmations: 1,
                })
                setWaiting(false)

                if (receipt.status === 'reverted') {
                  toast({
                    status: 'error',
                    description: <TxToastDescription link={txLink} text={t`Transaction failed.`} />,
                  })
                  throw new Error('The transaction gets reverted!')
                } else {
                  toast({
                    status: 'success',
                    description: <TxToastDescription link={txLink} text={t`Successfully unstaked MASK Tokens.`} />,
                  })
                  refetch()
                  recheckUnstake()
                  await resultModal.show({
                    title: t`Unstake`,
                    message: t`Unstake Successfully`,
                    description: t`You have successfully unstaked ${formatNumber(staked, 4)} MASK`,
                  })
                }
              } catch (err) {
                const cause = err instanceof TransactionExecutionError ? err.cause : err
                if (cause instanceof UserRejectedRequestError) {
                  toast({
                    status: 'error',
                    description: t`Your wallet cancelled the transaction.`,
                  })
                  return
                } else if (handleError(err)) {
                  return
                }
                throw err
              } finally {
                setWaiting(false)
              }
            }}
          >
            {hasUnstaked ? t`You have already unstaked` : t`Unstake MASK`}
          </MaskStakingButton>
        </UnstakeRequirementBoundary>
      </Stack>
    </ActionCard>
  )
})
