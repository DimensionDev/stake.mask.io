import { useAsyncFn } from 'react-use'
import urlcat from 'urlcat'
import { useAccount, useSignMessage } from 'wagmi'
import { FIREFLY_API_ROOT } from '../constants/api'
import { fetchJSON } from '../helpers/fetchJSON'
import { useAccountStore } from '../store/accountStore'
import { TwitterAuthorizeResponse } from '../types/api'
import { useHandleError } from './useHandleError'
import { useLogin } from './useLogin'
import { useToast } from './useToast'

export function useLinkTwitter() {
  const account = useAccount()
  const toast = useToast()
  const { signMessageAsync } = useSignMessage()
  const handleError = useHandleError()

  const { updateToken } = useAccountStore()
  const { token } = useAccountStore()
  const login = useLogin()

  return useAsyncFn(async () => {
    if (!account.address) return
    try {
      let jwtToken = token
      if (!jwtToken) {
        jwtToken = await login.mutateAsync()
      }

      const url = urlcat(FIREFLY_API_ROOT, '/v1/mask_stake/twitter/authorize', {
        wallet_address: account.address,
      })
      const res = await fetchJSON<TwitterAuthorizeResponse>(url, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
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
  }, [account.address, signMessageAsync, login.mutateAsync, updateToken])
}
