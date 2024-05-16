import { Grid, GridProps, Skeleton } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useUserInfo } from '../../hooks/useUserInfo'
import { RewardCard } from './RewardCard'
import { StakedMask } from './StakedMask'
import { UserTotalPoints } from './UserTotalPoint'

export interface UserStatusProps extends GridProps {}

export function UserStatus(props: UserStatusProps) {
  const { data: userInfo } = useUserInfo()
  const rss3 = userInfo?.reward_pool.find((x) => x.name === 'rss3')
  const ton = userInfo?.reward_pool.find((x) => x.name === 'ton')

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
      <RewardCard title={t`Estimated Rewards`} reward={rss3} />
      <RewardCard title={t`Estimated Rewards`} reward={ton} />
    </Grid>
  )
}
