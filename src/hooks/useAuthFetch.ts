import { useCallback } from 'react'
import { useAccount } from 'wagmi'

import { fetchJSON } from '@/helpers/fetchJSON'
import { useLogin } from '@/hooks/useLogin'
import { useAccountStore } from '@/store/accountStore'
import { Response } from '@/types/api'

export function useAuthFetch<T extends Response<unknown>>() {
  const login = useLogin()
  const { tokenMap } = useAccountStore()
  const account = useAccount()
  return useCallback<typeof fetchJSON<T>>(
    async (input, init) => {
      const address = account.address
      if (!address) throw new Error('No wallet connected')
      let jwtToken = tokenMap[address.toLowerCase()]
      if (!jwtToken) {
        jwtToken = await login.mutateAsync()
      }

      function send() {
        return fetchJSON<T>(input, {
          ...init,
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
      }

      const res = await send()
      if (res.code === 401) {
        jwtToken = await login.mutateAsync()
      }
      return await send()
    },
    [account.address, login, tokenMap],
  )
}
