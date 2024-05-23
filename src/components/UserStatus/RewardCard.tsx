import { Box, Button, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { memo } from 'react'
import { useAccount, useBalance, useReadContract, useToken } from 'wagmi'
import { rewardABI } from '../../abis/reward'
import QuestionSVG from '../../assets/question.svg?react'
import { ZERO } from '../../constants/misc.ts'
import { formatMarketCap } from '../../helpers/formatMarketCap.ts'
import { usePoolStore } from '../../store/poolStore'
import { UserInfo } from '../../types/api'
import { ProgressiveText } from '../ProgressiveText.tsx'
import { Spinner } from '../Spinner'
import { TokenIcon } from '../TokenIcon'
import { Tooltip } from '../Tooltip'
import { ActionCard, ActionCardProps } from './ActionCard'
import { useClaimReward } from './useClaimReward.tsx'

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
  const { data: userReward, isLoading: loadingRewards } = useReadContract({
    chainId,
    abi: rewardABI,
    address: rewardAddress,
    functionName: 'userRewards',
    args: reward?.reward_pool_id && account.address ? [reward.reward_pool_id, account.address] : undefined,
  })

  const [{ switchingChain, claiming, loadingUserInfo, waiting }, claimReward] = useClaimReward(reward, {
    defaultSymbol: defaultSymbol || token?.symbol,
  })

  const { data, isLoading: loadingRewardBalance } = useBalance({ chainId, address: reward?.address })
  const enoughReward = !data?.value || !reward ? false : data.value >= BigInt(reward.big_amount)

  const amount = reward?.amount ? +reward.amount : 0
  const hasClaimed = userReward !== undefined ? userReward > ZERO : false
  const loading = loadingUserInfo || switchingChain || loadingRewardBalance || loadingRewards || waiting
  const isDisabled = loading || !unlocked || !amount || !enoughReward || hasClaimed
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
                {hasClaimed ? 0 : formatMarketCap(amount)}
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
            unlocked || claiming ? undefined : (
              <Tooltip label={t`You can claim after the event ends.`} shouldWrapChildren>
                <Icon as={QuestionSVG} w="initial" h="initial" />
              </Tooltip>
            )
          }
          className="purple-gradient-button"
          onClick={claimReward}
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
