import { HStack, Skeleton, StackProps } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { UserTotalPoints } from './UserTotalPoint'
import { useUserInfo } from '../../hooks/useUserInfo'
import { usePoolStore } from '../../store/poolStore'
import { t } from '@lingui/macro'
import { StakedMask } from './StakedMask'
import { RewardCard } from './RewardCard'

export function UserStatus(props: StackProps) {
  const { address } = useAccount()
  const store = usePoolStore()
  const { data } = useUserInfo(address, store.poolId)
  console.log('data', data)
  if (!data)
    return (
      <HStack display="flex" flexDir="row" width="1280px" gap={4} {...props}>
        <Skeleton flexGrow={1} flexBasis={0} height="90px"></Skeleton>
        <Skeleton flexGrow={1} flexBasis={0} height="90px"></Skeleton>
        <Skeleton flexGrow={1} flexBasis={0} height="90px"></Skeleton>
        <Skeleton flexGrow={1} flexBasis={0} height="90px"></Skeleton>
      </HStack>
    )

  return (
    <HStack display="flex" flexDir="row" width="1280px" gap={4} {...props}>
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
    </HStack>
  )
}
