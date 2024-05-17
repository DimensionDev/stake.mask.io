import { Box, Button, HStack, Spinner, Stack, useToast } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useWriteContract } from 'wagmi'
import { rewardABI } from '../../abis/reward'
import { formatNumber } from '../../helpers/formatNumber'
import { useUserInfo } from '../../hooks/useUserInfo'
import { usePoolStore } from '../../store/poolStore'
import { UserInfo } from '../../types/api'
import { ProgressiveText } from '../ProgressiveText'
import { TokenIcon } from '../TokenIcon'
import { ActionCard, ActionCardProps } from './ActionCard'

interface Props extends ActionCardProps {
  tokenIcon?: string
  reward?: UserInfo['reward_pool'][number]
  unlocked?: boolean
}

export function RewardCard({ reward, tokenIcon, unlocked, ...props }: Props) {
  const { writeContractAsync, isPending } = useWriteContract()
  const { rewardAddress } = usePoolStore()
  const { data: userInfo, isLoading: loadingUserInfo } = useUserInfo()
  const toast = useToast()
  return (
    <ActionCard display="flex" flexDir="column" {...props}>
      <Stack alignItems="center" flexGrow={1}>
        <HStack alignItems="center" my="auto" flexGrow={1}>
          <Box width={12} height={12} pos="relative">
            <TokenIcon src={tokenIcon} />
          </Box>
          <Stack ml="10px">
            <ProgressiveText
              loading={!reward}
              fontSize={24}
              fontWeight={700}
              lineHeight="24px"
              skeletonHeight="24px"
              skeletonWidth="50px"
            >
              {formatNumber(reward?.amount ? +reward.amount : 0)}
            </ProgressiveText>
            <ProgressiveText
              fontSize={16}
              loading={!reward}
              fontWeight={700}
              lineHeight="16px"
              textTransform="uppercase"
              skeletonWidth="30px"
            >
              {reward?.name}
            </ProgressiveText>
          </Stack>
        </HStack>
        <Button
          rounded={24}
          isDisabled={!unlocked}
          alignSelf="stretch"
          color="neutrals.9"
          bg="gradient.purple"
          _hover={{ bg: 'gradient.purple', transform: 'scale(1.01)' }}
          _active={{ transform: 'scale(0.9)' }}
          disabled={loadingUserInfo}
          onClick={async () => {
            if (!reward || !userInfo || !rewardAddress) return
            const rewardPool = userInfo.reward_pool.find((x) => x.reward_pool_id === reward.reward_pool_id)
            if (!rewardPool) {
              toast({
                status: 'error',
                title: t`No match pool found.`,
              })
              return
            }
            // TODO check if is unlocked
            const res = await writeContractAsync({
              abi: rewardABI,
              address: rewardAddress,
              functionName: 'claim',
              args: [reward.reward_pool_id, BigInt(reward.big_amount), rewardPool.proof],
            })
            console.log('claim result', res)
          }}
        >
          {unlocked ? isPending ? <Spinner size="sm" /> : t`Claim` : t`Not unlocked yet`}
        </Button>
      </Stack>
    </ActionCard>
  )
}
