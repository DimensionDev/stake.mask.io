import { useQuery } from '@tanstack/react-query'
import urlcat from 'urlcat'
import { useAccount } from 'wagmi'

import { FIREFLY_API_ROOT } from '@/constants/api'
import { convertTwitterAvatar } from '@/helpers/convertTwitterAvatar'
import { fetchJSON } from '@/helpers/fetchJSON'
import { usePoolStore } from '@/store/poolStore'
import { UserInfo, UserInfoResponse } from '@/types/api'

export function useUserInfo() {
  const { address } = useAccount()
  const { poolId } = usePoolStore()
  return useQuery({
    enabled: poolId !== undefined && !!address,
    queryKey: ['user-info', address, poolId],
    queryFn: async () => {
      const url = urlcat(FIREFLY_API_ROOT, '/v1/mask_stake/user_info', {
        address,
        pool_id: poolId,
        source: 'other',
      })
      return fetchJSON<UserInfoResponse>(url)
    },
    select(res) {
      if (!res.data) return res.data
      return {
        ...res.data,
        twitter_image: convertTwitterAvatar(res.data.twitter_image),
      } as UserInfo
    },
  })
}
