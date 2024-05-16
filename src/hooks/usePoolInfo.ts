import { useQuery } from '@tanstack/react-query'
import urlcat from 'urlcat'
import { FIREFLY_API_ROOT } from '../constants/api'
import { fetchJSON } from '../helpers/fetchJSON'
import { PoolInfoResponse } from '../types/api'

/**
 * Get info of current pool
 */
export function usePoolInfo() {
  return useQuery({
    queryKey: ['pool-info'],
    queryFn: async () => {
      const url = urlcat(FIREFLY_API_ROOT, '/v1/mask_stake/pool_info', {})
      const res = await fetchJSON<PoolInfoResponse>(url)
      return res.data
    },
  })
}
