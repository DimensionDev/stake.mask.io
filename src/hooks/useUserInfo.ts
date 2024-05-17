import { useQuery } from '@tanstack/react-query'
import { fetchJSON } from '../helpers/fetchJSON'
import { FIREFLY_API_ROOT } from '../constants/api'
import { UserInfo, UserInfoResponse } from '../types/api'
import urlcat from 'urlcat'

export function useUserInfo(address: string | undefined, pool_id: number | null) {
  return useQuery({
    enabled: !!pool_id && !!address,
    queryKey: ['user-info', address, pool_id],
    queryFn: async () => {
      const url = urlcat(FIREFLY_API_ROOT, '/v1/mask_stake/user_info', {
        address,
        pool_id: pool_id,
      })
      return fetchJSON<UserInfoResponse>(url)
    },
    select(res) {
      if (!res.data) return res.data
      return {
        ...res.data,
        twitter_image: res.data.twitter_image.replace(/_normal.(jpe?g|png|gif|bmp)/, '_400x400.$1'),
      } as UserInfo
    },
  })
}
