import { Box, Button, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { memo } from 'react'
import { useAccount, useBalance, useReadContract, useToken } from 'wagmi'

import { rewardABI } from '@/abis/reward'
import QuestionSVG from '@/assets/question.svg?react'
import { ProgressiveText } from '@/components/ProgressiveText.tsx'
import { Spinner } from '@/components/Spinner'
import { TokenIcon } from '@/components/TokenIcon'
import { Tooltip } from '@/components/Tooltip'
import { ActionCard, ActionCardProps } from '@/components/UserStatus/ActionCard'
import { useClaimReward } from '@/components/UserStatus/useClaimReward.tsx'
import { ZERO } from '@/constants/misc.ts'
import { formatMarketCap } from '@/helpers/formatMarketCap.ts'
import { usePoolStore } from '@/store/poolStore'
import { UserInfo } from '@/types/api'

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
  const { chainId, rewardAddress } = usePoolStore()
  const { data: token } = useToken({ chainId, address: reward?.address })
  const {
    data: userReward,
    isLoading: loadingRewards,
    refetch: recheckUserReward,
  } = useReadContract({
    chainId,
    abi: rewardABI,
    address: rewardAddress,
    functionName: 'userRewards',
    args: reward?.reward_pool_id && account.address ? [reward.reward_pool_id, account.address] : undefined,
  })

  const [{ switchingChain, claiming, loadingUserInfo, waiting }, claimReward] = useClaimReward(reward, {
    defaultSymbol: defaultSymbol || token?.symbol,
  })

  const { data, isLoading: loadingRewardBalance } = useBalance({
    chainId,
    address: rewardAddress,
    token: reward?.address,
  })
  const noEnoughReward = data?.value !== undefined && reward ? data.value < BigInt(reward.big_amount) : false

  const amount = reward?.amount ? +reward.amount : 0
  const hasClaimed = userReward !== undefined ? userReward > ZERO : false
  const loading = loadingUserInfo || switchingChain || loadingRewardBalance || loadingRewards || waiting
  const isDisabled = loading || !unlocked || !amount || noEnoughReward || hasClaimed
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
            (!unlocked || noEnoughReward) && !hasClaimed ? (
              <Tooltip
                label={noEnoughReward ? t`No enough ${tokenSymbol} to claim` : t`You can claim after the event ends.`}
                shouldWrapChildren
              >
                <Icon as={QuestionSVG} w="initial" h="initial" />
              </Tooltip>
            ) : undefined
          }
          className="purple-gradient-button"
          onClick={async () => {
            await claimReward()
            await recheckUserReward()
          }}
        >
          {claiming ? (
            <Spinner h="24px" w="24px" color="neutrals.9" />
          ) : hasClaimed ? (
            t`You have already claimed `
          ) : (
            t`Claim`
          )}
        </Button>
      </Stack>
    </ActionCard>
  )
})
