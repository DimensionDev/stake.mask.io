import { Box, Button, HStack, Icon, Skeleton, SkeletonCircle, Stack, Text } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useConfig, useWriteContract } from 'wagmi'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { rewardABI } from '../../abis/reward'
import QuestionSVG from '../../assets/question.svg?react'
import { formatNumber } from '../../helpers/formatNumber'
import { useToast } from '../../hooks/useToast'
import { useUserInfo } from '../../hooks/useUserInfo'
import { resultModal } from '../../modals/ResultModal'
import { usePoolStore } from '../../store/poolStore'
import { UserInfo } from '../../types/api'
import { Spinner } from '../Spinner'
import { TokenIcon } from '../TokenIcon'
import { Tooltip } from '../Tooltip'
import { ActionCard, ActionCardProps } from './ActionCard'

interface Props extends ActionCardProps {
  tokenIcon?: string
  reward?: UserInfo['reward_pool'][number]
  unlocked?: boolean
}

export function RewardCard({ reward, tokenIcon, unlocked, ...props }: Props) {
  const config = useConfig()
  const { writeContractAsync, isPending } = useWriteContract()
  const { rewardAddress } = usePoolStore()
  const { data: userInfo, isLoading: loadingUserInfo } = useUserInfo()
  const toast = useToast()

  if (!reward) {
    return <RewardCardSkeleton {...props} />
  }

  const amount = reward.amount ? +reward.amount : 0
  const isDisabled = !unlocked || !amount || loadingUserInfo
  const tokenSymbol = reward.name.toUpperCase() || 'Unknown Token'
  return (
    <ActionCard display="flex" flexDir="column" {...props}>
      <Stack alignItems="center" flexGrow={1} spacing={5} mt={5}>
        <HStack alignItems="center" my="auto" flexGrow={1}>
          <Box width={12} height={12} pos="relative">
            <TokenIcon src={tokenIcon} />
          </Box>
          <Stack ml="10px">
            <Tooltip label={amount}>
              <Text fontSize={24} fontWeight={700} lineHeight="24px">
                {formatNumber(amount)}
              </Text>
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
            if (!userInfo || !rewardAddress) return
            const rewardPool = userInfo.reward_pool.find((x) => x.reward_pool_id === reward.reward_pool_id)
            if (!rewardPool) {
              toast({
                status: 'error',
                title: t`No matched pool found.`,
              })
              return
            }
            const hash = await writeContractAsync({
              abi: rewardABI,
              address: rewardAddress,
              functionName: 'claim',
              args: [reward.reward_pool_id, BigInt(reward.big_amount), rewardPool.proof],
            })
            toast({
              status: 'success',
              title: t`Transaction submitted!`,
            })

            const receipt = await waitForTransactionReceipt(config, {
              hash,
              confirmations: 1,
            })

            if (receipt.status === 'reverted') {
              toast({
                status: 'error',
                title: t`The transaction gets reverted!`,
              })
              throw new Error('The approval transaction gets reverted!')
            } else {
              await resultModal.show({
                title: t`Claim`,
                message: t`Claim Successfully`,
                description: t`You have successfully claimed ${formatNumber(+reward.amount)} RSS3.`,
              })
            }
          }}
        >
          {isPending ? <Spinner h="24px" w="24px" color="neutrals.9" /> : t`Claim`}
        </Button>
      </Stack>
    </ActionCard>
  )
}

export function RewardCardSkeleton(props: ActionCardProps) {
  return (
    <ActionCard display="flex" flexDir="column" {...props}>
      <Stack alignItems="center" flexGrow={1}>
        <HStack alignItems="center" my="auto" flexGrow={1}>
          <Box width={12} height={12} pos="relative">
            <SkeletonCircle w={12} height={12} />
          </Box>
          <Stack ml="10px">
            <Skeleton fontSize={24} width="100px" height="24px" />
            <Skeleton fontSize={24} lineHeight="16px" width="60px" height="16px" />
          </Stack>
        </HStack>
        <Button rounded={24} isDisabled alignSelf="stretch" color="neutrals.9" className="purple-gradient-button">
          <Spinner h="24px" w="24px" color="neutrals.9" />
        </Button>
      </Stack>
    </ActionCard>
  )
}
