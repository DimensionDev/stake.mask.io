import { Grid, GridProps, Skeleton } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { UserTotalPoints } from './UserTotalPoint'
import { useUserInfo } from '../../hooks/useUserInfo'
import { usePoolStore } from '../../store/poolStore'
import { t } from '@lingui/macro'
import { StakedMask } from './StakedMask'
import { RewardCard } from './RewardCard'

export interface UserStatusProps extends GridProps {}

export function UserStatus(props: UserStatusProps) {
  const { address } = useAccount()
  const store = usePoolStore()
  const { data: userInfo } = useUserInfo(address, store.poolId)

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
      <StakedMask alignSelf="stretch" />
      <RewardCard alignSelf="stretch" title={t`Estimated Rewards`} />
      <RewardCard alignSelf="stretch" title={t`Estimated Rewards`} />
    </Grid>
  )
}
