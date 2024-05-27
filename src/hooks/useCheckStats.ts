import { useCallback } from 'react'
import urlcat from 'urlcat'
import { useAccount } from 'wagmi'

import { FIREFLY_API_ROOT } from '@/constants/api'
import { fetchJSON } from '@/helpers/fetchJSON'
import { useLogin } from '@/hooks/useLogin'
import { useAccountStore } from '@/store/accountStore'
import { CheckTokenResponse } from '@/types/api'

export function useCheckStats() {
  const account = useAccount()

  const { token } = useAccountStore()
  const login = useLogin()

  return useCallback(async () => {
    const address = account.address
    if (!address) return
    try {
      let jwtToken = token
      if (!jwtToken) {
        jwtToken = await login.mutateAsync()
      }

      const url = urlcat(FIREFLY_API_ROOT, 'v1/mask_stake/check_token')
      const res = await fetchJSON<CheckTokenResponse>(url, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      return res.data
    } catch {
      //
    }
  }, [account.address, token, login])
}
