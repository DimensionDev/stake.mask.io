import { Box, BoxProps, HStack, Icon, Stack } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { ActionCard } from './ActionCard'

import { useMemo, useState } from 'react'
import { formatUnits } from 'viem'
import { useAccount, useConfig, useReadContract, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { StakeManagerABI } from '../../abis/stakeManager.ts'
import Question from '../../assets/question.svg?react'
import { ZERO } from '../../constants/misc.ts'
import { useHandleError } from '../../hooks/useHandleError.ts'
import { useToast } from '../../hooks/useToast.tsx'
import { useUserInfo } from '../../hooks/useUserInfo.ts'
import { resultModal } from '../../modals/ResultModal.tsx'
import { usePoolStore } from '../../store/poolStore.ts'
import { MaskStakingButton } from '../MaskStakingButton.tsx'
import { ProgressiveText } from '../ProgressiveText.tsx'
import { Tooltip } from '../Tooltip.tsx'
import { UnstakeRequirementBoundary } from '../UnstakeRequirementBoundary/index.tsx'
import { formatNumber } from '../../helpers/formatNumber.ts'
import { formatMarketCap } from '../../helpers/formatMarketCap.ts'

export function StakedMask(props: BoxProps) {
  const config = useConfig()
  const account = useAccount()
  const { stakeManagerAddress } = usePoolStore()
  const { data: userInfo, isLoading: loadingUserInfo } = useUserInfo()
  const { isLoading: isReadingUserInfos, data: chainData } = useReadContract({
    abi: StakeManagerABI,
    functionName: 'userInfos',
    address: stakeManagerAddress,
    args: account.address ? [account.address] : undefined,
  })

  const staked = useMemo(() => {
    if (chainData) {
      return +formatUnits(chainData[0], 18)
    }
    return userInfo?.amount
  }, [chainData, userInfo?.amount])
  const ratio = userInfo?.address_type === '1' ? 1.05 : 1

  const [waiting, setWaiting] = useState(false)
  const { writeContractAsync, isPending: isWithdrawing } = useWriteContract()
  const toast = useToast()
  const handleError = useHandleError()

  const isZero = chainData?.[0] ? chainData[0] === ZERO : true
  const loading = isWithdrawing || waiting || isReadingUserInfos
  const disabled = isZero
  return (
    <ActionCard title={t`Stake Mask`} display="flex" flexDir="column" {...props}>
      <Stack alignItems="center">
        <ProgressiveText
          loading={isReadingUserInfos && loadingUserInfo}
          fontSize={48}
          lineHeight="56px"
          fontWeight={700}
          skeletonWidth="100px"
          skeletonHeight="56px"
        >
          {staked ? formatMarketCap(staked, 4) : '-'}
        </ProgressiveText>
        <HStack alignItems="center" my="auto">
          <ProgressiveText as="div" loading={loadingUserInfo} skeletonWidth="50px">
            {t`+${userInfo?.score_per_hour} Points/h`}
          </ProgressiveText>
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
            onClick={async () => {
              if (!chainData?.[0]) return
              try {
                const hash = await writeContractAsync({
                  abi: StakeManagerABI,
                  address: stakeManagerAddress,
                  functionName: 'withdraw',
                  args: [chainData[0]],
                })
                toast({
                  status: 'success',
                  title: t`Transaction submitted!`,
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
                    title: t`The transaction gets reverted!`,
                  })
                  throw new Error('The transaction gets reverted!')
                } else {
                  await resultModal.show({
                    title: t`Unstake`,
                    message: t`Unstake Successfully`,
                    description: t`You have successfully unstaked ${staked} MASK`,
                  })
                }
              } catch (err) {
                if (handleError(err)) return
                throw err
              } finally {
                setWaiting(false)
              }
            }}
          >{t`Unstake Mask`}</MaskStakingButton>
        </UnstakeRequirementBoundary>
      </Stack>
    </ActionCard>
  )
}
