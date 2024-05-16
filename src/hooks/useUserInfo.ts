import { useQuery } from '@tanstack/react-query'
import { fetchJSON } from '../helpers/fetchJSON'
import { FIREFLY_API_ROOT } from '../constants/api'
import { UserInfoResponse } from '../types/api'
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
  })
}
