import { useAsyncFn } from 'react-use'
import urlcat from 'urlcat'
import { useAccount, useClient } from 'wagmi'
import { signMessage } from 'wagmi/actions'
import { config } from '../configs/wagmiClient'
import { FIREFLY_API_ROOT } from '../constants/api'
import { fetchJSON } from '../helpers/fetchJSON'
import { TwitterAuthorizeResponse } from '../types/api'
import { useToast } from '@chakra-ui/react'
import { UserRejectedRequestError } from 'viem'

// Any message is ok.
const message = 'Hello, world!'
export function useLinkTwitter() {
  const account = useAccount()
  const client = useClient()
  const toast = useToast()

  return useAsyncFn(async () => {
    if (!account.address || !client) return
    try {
      const signed = await signMessage(config, {
        account: account.address,
        message: message,
      })
      const url = urlcat(FIREFLY_API_ROOT, '/v1/mask_stake/twitter/authorize', {
        original_message: message,
        signature_message: signed.slice(2), // omit 0x
        wallet_address: account.address,
      })
      const res = await fetchJSON<TwitterAuthorizeResponse>(url)
      if (res.code !== 200) {
        console.error('Failed to get twitter authorize', res.message, res.reason)
        return
      }
      location.href = res.data.url
    } catch (err) {
      if (err instanceof UserRejectedRequestError) {
        toast({
          status: 'error',
          position: 'top-right',
          title: err.details,
        })
        return
      }
      throw err
    }
  }, [account.address, client])
}
