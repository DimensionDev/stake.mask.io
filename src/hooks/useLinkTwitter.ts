import { useAsyncFn } from 'react-use'
import urlcat from 'urlcat'
import { useAccount } from 'wagmi'

import { FIREFLY_API_ROOT } from '@/constants/api'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useHandleError } from '@/hooks/useHandleError'
import { useToast } from '@/hooks/useToast'
import { TwitterAuthorizeResponse } from '@/types/api'

export function useLinkTwitter() {
  const account = useAccount()
  const toast = useToast()
  const handleError = useHandleError()

  const authFetch = useAuthFetch<TwitterAuthorizeResponse>()

  return useAsyncFn(async () => {
    const address = account.address
    if (!address) return
    try {
      const url = urlcat(FIREFLY_API_ROOT, '/v1/mask_stake/twitter/authorize', {
        wallet_address: address,
      })
      const res = await authFetch(url)
      if (res.code !== 200) {
        console.error('Failed to get twitter authorize', res.message, res.reason)
        toast({
          status: 'error',
          title: 'Failed to get twitter authorize',
          description: res.message,
        })
        return
      }
      location.href = res.data.url
    } catch (err) {
      if (handleError(err)) return
      throw err
    }
  }, [account.address, handleError])
}
