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
  const { data } = useUserInfo(address, store.poolId)
  // const data = null

  if (!data)
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
      <UserTotalPoints flexGrow={1} flexBasis={0} user={data.data} />
      <StakedMask alignSelf="stretch" flexGrow={1} flexBasis={0} />
      <RewardCard
        alignSelf="stretch"
        title={t`Estimated Rewards`}
        flexGrow={1}
        flexBasis={0}
      />
      <RewardCard
        alignSelf="stretch"
        title={t`Estimated Rewards`}
        flexGrow={1}
        flexBasis={0}
      />
    </Grid>
  )
}
