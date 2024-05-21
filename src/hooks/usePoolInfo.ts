import { useQuery } from '@tanstack/react-query'
import urlcat from 'urlcat'
import { FIREFLY_API_ROOT } from '../constants/api'
import { fetchJSON } from '../helpers/fetchJSON'
import { PoolInfoResponse } from '../types/api'
import { usePoolStore } from '../store/poolStore'

/**
 * Get info of current pool
 */
export function usePoolInfo() {
  const { poolId } = usePoolStore()
  return useQuery({
    queryKey: ['pool-info', poolId],
    queryFn: async () => {
      const url = urlcat(FIREFLY_API_ROOT, '/v1/mask_stake/pool_info', { pool_id: poolId })
      const res = await fetchJSON<PoolInfoResponse>(url)
      return res.data
    },
  })
}
