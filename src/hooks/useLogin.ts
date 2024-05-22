import { useMutation } from '@tanstack/react-query'
import urlcat from 'urlcat'
import { useAccount, useSignMessage } from 'wagmi'
import { FIREFLY_API_ROOT } from '../constants/api'
import { fetchJSON } from '../helpers/fetchJSON'
import { LoginResponse } from '../types/api'
import { useAccountStore } from '../store/accountStore'

export function useLogin() {
  const account = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { updateToken } = useAccountStore()
  return useMutation({
    mutationFn: async () => {
      const message = `Login stake.mask.io at ${new Date().toString()}`
      const signed = await signMessageAsync({ message })

      const loginUrl = urlcat(FIREFLY_API_ROOT, '/v1/mask_stake/wallet/login')
      const loginRes = await fetchJSON<LoginResponse>(loginUrl, {
        method: 'POST',
        body: JSON.stringify({
          original_message: message,
          signature_message: signed.slice(2), // omit 0x
          wallet_address: account.address,
        }),
      })
      if (loginRes.code === 200) {
        updateToken(loginRes.data.token)
        return loginRes.data.token
      } else {
        throw new Error('Failed to login')
      }
    },
  })
}
