import { Grid, GridProps, Skeleton } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useUserInfo } from '../../hooks/useUserInfo'
import { RewardCard } from './RewardCard'
import { StakedMask } from './StakedMask'
import { UserTotalPoints } from './UserTotalPoint'
import { usePoolStore } from '../../store/poolStore'
import { useReadContract } from 'wagmi'
import { StakeManagerABI } from '../../abis/stakeManager'

export interface UserStatusProps extends GridProps {}

export function UserStatus(props: UserStatusProps) {
  const { data: userInfo } = useUserInfo()
  const { poolId, stakeManagerAddress } = usePoolStore()
  const rss3 = userInfo?.reward_pool.find((x) => x.name === 'rss3')
  const ton = userInfo?.reward_pool.find((x) => x.name === 'ton')

  const res = useReadContract({
    abi: StakeManagerABI,
    address: stakeManagerAddress,
    functionName: 'pools',
    args: poolId ? [BigInt(poolId)] : undefined,
  })
  const unlocked = res.data?.[2]

  if (!userInfo)
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
        <Skeleton h="198px" />
        <Skeleton h="198px" />
        <Skeleton h="198px" />
        <Skeleton h="198px" />
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
        unlocked={unlocked}
      />
      <RewardCard
        title={t`Estimated Rewards`}
        reward={ton}
        tokenIcon={new URL('../../assets/ton.svg', import.meta.url).href}
        unlocked={unlocked}
      />
    </Grid>
  )
}
