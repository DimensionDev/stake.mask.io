import { Grid, GridProps, Skeleton } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useAccount, useReadContract } from 'wagmi'

import { StakeManagerABI } from '@/abis/stakeManager'
import { RewardCard } from '@/components/UserStatus/RewardCard'
import { StakedMask } from '@/components/UserStatus/StakedMask'
import { UserTotalPoints } from '@/components/UserStatus/UserTotalPoints'
import { useUserInfo } from '@/hooks/useUserInfo'
import { usePoolStore } from '@/store/poolStore'

export interface UserStatusProps extends GridProps {}

export function UserStatus(props: UserStatusProps) {
  const { data: userInfo, isLoading } = useUserInfo()
  const { chainId, poolId, stakeManagerAddress } = usePoolStore()
  const rss3 = userInfo?.reward_pool.find((x) => x.name === 'rss3')
  const ton = userInfo?.reward_pool.find((x) => x.name === 'ton')

  const res = useReadContract({
    chainId,
    abi: StakeManagerABI,
    address: stakeManagerAddress,
    functionName: 'pools',
    args: poolId ? [BigInt(poolId)] : undefined,
  })
  const unlocked = res.data?.[2]

  const account = useAccount()

  if (!account.address) return null

  if (!userInfo || isLoading)
    return (
      <Grid
        gap={6}
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        w="100%"
        maxW="maxW"
        {...props}
      >
        <Skeleton h="202px" rounded="16px" />
        <Skeleton h="202px" rounded="16px" />
        <Skeleton h="202px" rounded="16px" />
        <Skeleton h="202px" rounded="16px" />
      </Grid>
    )

  return (
    <Grid
      gap={6}
      templateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      w="100%"
      maxW="maxW"
      {...props}
    >
      <UserTotalPoints user={userInfo} />
      <StakedMask />
      <RewardCard
        title={t`Estimated Rewards`}
        reward={rss3}
        tokenIcon={new URL('../../assets/rss3.svg', import.meta.url).href}
        tokenSymbol="RSS3"
        unlocked={unlocked}
      />
      <RewardCard
        title={t`Estimated Rewards`}
        reward={ton}
        tokenIcon={new URL('../../assets/ton.svg', import.meta.url).href}
        tokenSymbol="TON"
        unlocked={unlocked}
      />
    </Grid>
  )
}
