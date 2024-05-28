import { useCallback } from 'react'
import urlcat from 'urlcat'

import { FIREFLY_API_ROOT } from '@/constants/api'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { CheckTokenResponse } from '@/types/api'

export function useCheckStats() {
  const authFetch = useAuthFetch<CheckTokenResponse>()
  return useCallback(async () => {
    try {
      const url = urlcat(FIREFLY_API_ROOT, 'v1/mask_stake/check_token')
      const res = await authFetch(url)
      return res.data
    } catch {
      //
    }
  }, [authFetch])
}
