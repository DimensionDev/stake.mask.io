import { useCallback } from 'react'
import urlcat from 'urlcat'

import { FIREFLY_API_ROOT } from '@/constants/api'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { CheckTokenResponse } from '@/types/api'

/**
 * Return true if server block height is lower than the one passed in
 */
export function useCheckStats() {
  const authFetch = useAuthFetch<CheckTokenResponse>()
  return useCallback(
    async (blockNumber: bigint) => {
      try {
        const url = urlcat(FIREFLY_API_ROOT, 'v1/mask_stake/check_token')
        const res = await authFetch(url)
        return BigInt(res.data.height) < blockNumber
      } catch {
        //
      }
    },
    [authFetch],
  )
}
