import { useMutation, useQueryClient } from '@tanstack/react-query'
import urlcat from 'urlcat'
import { useAccount } from 'wagmi'
import { FIREFLY_API_ROOT } from '../constants/api'
import { fetchJSON } from '../helpers/fetchJSON'
import { useAccountStore } from '../store/accountStore'
import { UpdateUserInfoParams, UpdateUserInfoResponse } from '../types/api'
import { useLogin } from './useLogin'

export function useUpdateUserInfo() {
  const queryClient = useQueryClient()
  const account = useAccount()
  const { token } = useAccountStore()
  const login = useLogin()
  return useMutation({
    mutationKey: ['update-user-info', account.address],
    mutationFn: async (params: Pick<UpdateUserInfoParams, 'show_avatar' | 'display_username'>) => {
      if (!account.address) return
      let jwtToken = token
      if (!token) {
        jwtToken = await login.mutateAsync()
      }

      const url = urlcat(FIREFLY_API_ROOT, '/v1/mask_stake/twitter/update')
      return fetchJSON<UpdateUserInfoResponse>(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(params),
      })
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['user-info'] })
    },
  })
}
