import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import urlcat from 'urlcat'
import { useAccount, useSignMessage } from 'wagmi'
import { FIREFLY_API_ROOT } from '../constants/api'
import { fetchJSON } from '../helpers/fetchJSON'
import { UpdateUserInfoParams, UpdateUserInfoResponse } from '../types/api'

export function useUpdateUserInfo() {
  const { signMessageAsync } = useSignMessage()
  const account = useAccount()
  const queryClient = useQueryClient()
  const message = useMemo(() => `Update Profile ${Date.now()}`, [])
  return useMutation({
    mutationKey: ['update-user-info', account.address],
    mutationFn: async (params: Pick<UpdateUserInfoParams, 'show_avatar' | 'display_username'>) => {
      if (!account.address) return
      const signed = await signMessageAsync({ message })
      const url = urlcat(FIREFLY_API_ROOT, '/v1/mask_stake/twitter/update')
      const payload: UpdateUserInfoParams = {
        ...params,
        original_message: message,
        signature_message: signed.slice(2), // omit 0x
        wallet_address: account.address,
      }
      return fetchJSON<UpdateUserInfoResponse>(url, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
    },
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ['user-info'] })
    },
  })
}
