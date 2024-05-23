import { Box, Button, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { produce } from 'immer'
import { memo, useMemo, useState } from 'react'
import { TransactionExecutionError, UserRejectedRequestError, formatUnits } from 'viem'
import {
  useAccount,
  useBalance,
  useChainId,
  useConfig,
  useReadContract,
  useSwitchChain,
  useToken,
  useWriteContract,
} from 'wagmi'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { rewardABI } from '../../abis/reward'
import QuestionSVG from '../../assets/question.svg?react'
import { queryClient } from '../../configs/queryClient.ts'
import { formatMarketCap } from '../../helpers/formatMarketCap.ts'
import { formatNumber } from '../../helpers/formatNumber'
import { resolveTxLink } from '../../helpers/resolveTxLink.ts'
import { useHandleError } from '../../hooks/useHandleError.ts'
import { useToast } from '../../hooks/useToast'
import { useUserInfo } from '../../hooks/useUserInfo'
import { resultModal } from '../../modals/ResultModal'
import { usePoolStore } from '../../store/poolStore'
import { UserInfo } from '../../types/api'
import { Spinner } from '../Spinner'
import { TokenIcon } from '../TokenIcon'
import { Tooltip } from '../Tooltip'
import { TxToastDescription } from '../TxToastDescription.tsx'
import { ActionCard, ActionCardProps } from './ActionCard'
import { ProgressiveText } from '../ProgressiveText.tsx'

function clearReward(address: string, rewardPoolId: number) {
  queryClient.setQueriesData<UserInfo>({ queryKey: ['user-info', address] }, (info) => {
    if (!info) return info
    return produce(info, (draft) => {
      const rewardPool = draft.reward_pool.find((x) => x.reward_pool_id === rewardPoolId)
      if (rewardPool) {
        rewardPool.amount = '0'
        rewardPool.big_amount = '0'
      }
    })
  })
}

interface Props extends ActionCardProps {
  tokenIcon?: string
  tokenSymbol?: string
  reward?: UserInfo['reward_pool'][number]
  unlocked?: boolean
}

export const RewardCard = memo(function RewardCard({
  reward,
  tokenIcon,
  tokenSymbol: defaultSymbol,
  unlocked,
  ...props
}: Props) {
  reward?.reward_pool_id
  const account = useAccount()
  const currentChainId = useChainId()
  const config = useConfig()
  const { chainId, poolId, rewardAddress } = usePoolStore()
  const [waiting, setWaiting] = useState(false)
  const { switchChainAsync, isPending: switchingChain } = useSwitchChain()
  const { writeContractAsync, isPending } = useWriteContract()
  const { data: userInfo, isLoading: loadingUserInfo } = useUserInfo()
  const toast = useToast({ title: t`Claim` })
  const { data: token } = useToken({ chainId, address: reward?.address })
  const handleError = useHandleError()
  const { data: userReward, isLoading: loadingRewards } = useReadContract({
    chainId,
    abi: rewardABI,
    address: rewardAddress,
    functionName: 'userRewards',
    args: reward?.reward_pool_id && account.address ? [reward.reward_pool_id, account.address] : undefined,
  })

  const { data, isLoading: loadingRewardBalance } = useBalance({ chainId, address: reward?.address })
  const enoughReward = !data?.value || !reward ? false : data.value >= BigInt(reward.big_amount)

  const decimals = token?.decimals || 18
  const amount = useMemo(() => {
    if (userReward !== undefined) return formatUnits(userReward, decimals)
    return reward?.amount ? +reward.amount : 0
  }, [userReward, decimals, reward?.amount])
  const loading = loadingUserInfo || switchingChain || loadingRewardBalance || loadingRewards || waiting
  const isDisabled = loading || !unlocked || !amount || !enoughReward
  const tokenSymbol = reward?.name?.toUpperCase() || defaultSymbol

  return (
    <ActionCard display="flex" flexDir="column" {...props}>
      <Stack alignItems="center" flexGrow={1} spacing={5} mt={5}>
        <HStack alignItems="center" my="auto" flexGrow={1}>
          <Box width={12} height={12} pos="relative">
            <TokenIcon src={tokenIcon} />
          </Box>
          <Stack ml="10px">
            <Tooltip label={amount}>
              <ProgressiveText
                fontSize={24}
                fontWeight={700}
                lineHeight="24px"
                loading={loadingRewards}
                skeletonProps={{ w: '60px', height: '24px', rounded: '4px' }}
              >
                {formatMarketCap(amount)}
              </ProgressiveText>
            </Tooltip>
            <Text fontSize={16} fontWeight={700} lineHeight="16px">
              {tokenSymbol}
            </Text>
          </Stack>
        </HStack>
        <Button
          rounded={24}
          isDisabled={isDisabled}
          alignSelf="stretch"
          color="neutrals.9"
          rightIcon={
            unlocked || isPending ? undefined : (
              <Tooltip label={t`You can claim after the event ends.`} shouldWrapChildren>
                <Icon as={QuestionSVG} w="initial" h="initial" />
              </Tooltip>
            )
          }
          className="purple-gradient-button"
          onClick={async () => {
            if (!reward || !userInfo || !rewardAddress) return
            const rewardPool = userInfo.reward_pool.find((x) => x.reward_pool_id === reward?.reward_pool_id)
            if (!rewardPool) {
              toast({
                status: 'error',
                title: t`No matched pool found.`,
              })
              return
            }
            try {
              if (currentChainId !== chainId) {
                await switchChainAsync({ chainId })
              }
              toast({
                status: 'loading',
                description: t`Confirm this transaction in your wallet.`,
              })
              const hash = await writeContractAsync({
                abi: rewardABI,
                address: rewardAddress,
                functionName: 'claim',
                args: [reward.reward_pool_id, BigInt(reward.big_amount), rewardPool.proof],
              })
              const txLink = resolveTxLink(chainId, hash)
              toast({
                status: 'loading',
                description: <TxToastDescription link={txLink} text={t`Transaction submitted!`} />,
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
                throw new Error('The approval transaction gets reverted!')
              } else {
                toast({
                  status: 'success',
                  description: (
                    <TxToastDescription
                      link={txLink}
                      text={t`Successfully claimed ${tokenSymbol?.toUpperCase()} Tokens.`}
                      color="primary.4"
                    />
                  ),
                })
                if (account.address && poolId) clearReward(account.address, poolId)
                await resultModal.show({
                  title: t`Claim`,
                  message: t`Claim Successfully`,
                  description: t`You have successfully claimed ${formatNumber(+reward.amount, 4)} ${tokenSymbol}.`,
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
              } else if (handleError(err)) return
              throw err
            } finally {
              setWaiting(false)
            }
          }}
        >
          {isPending ? <Spinner h="24px" w="24px" color="neutrals.9" /> : t`Claim`}
        </Button>
      </Stack>
    </ActionCard>
  )
})
