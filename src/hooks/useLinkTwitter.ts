import { useToast } from '@chakra-ui/react'
import { useAsyncFn } from 'react-use'
import urlcat from 'urlcat'
import { UserRejectedRequestError } from 'viem'
import { useAccount, useSignMessage } from 'wagmi'
import { FIREFLY_API_ROOT } from '../constants/api'
import { fetchJSON } from '../helpers/fetchJSON'
import { TwitterAuthorizeResponse } from '../types/api'

// Any message is ok.
const message = 'Stake $MASK'
export function useLinkTwitter() {
  const account = useAccount()
  const toast = useToast()
  const { signMessageAsync } = useSignMessage()

  return useAsyncFn(async () => {
    if (!account.address) return
    try {
      const signed = await signMessageAsync({ message })
      const url = urlcat(FIREFLY_API_ROOT, '/v1/mask_stake/twitter/authorize', {
        original_message: message,
        signature_message: signed.slice(2), // omit 0x
        wallet_address: account.address,
      })
      const res = await fetchJSON<TwitterAuthorizeResponse>(url)
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
      if (err instanceof UserRejectedRequestError) {
        toast({
          status: 'error',
          title: err.details,
        })
        return
      }
      throw err
    }
  }, [account.address, signMessageAsync])
}
