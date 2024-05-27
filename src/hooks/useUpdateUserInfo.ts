import { useMutation, useQueryClient } from '@tanstack/react-query'
import urlcat from 'urlcat'
import { useAccount } from 'wagmi'

import { FIREFLY_API_ROOT } from '@/constants/api'
import { isSameAddress } from '@/helpers/isSameAddress'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { usePoolStore } from '@/store/poolStore'
import { StakeRankItem, UpdateUserInfoParams, UpdateUserInfoResponse } from '@/types/api'

export function useUpdateUserInfo() {
  const queryClient = useQueryClient()
  const account = useAccount()
  const { poolId } = usePoolStore()
  const authFetch = useAuthFetch<UpdateUserInfoResponse>()
  return useMutation({
    mutationKey: ['update-user-info', account.address],
    mutationFn: async (params: Pick<UpdateUserInfoParams, 'show_avatar' | 'display_username'>) => {
      const url = urlcat(FIREFLY_API_ROOT, '/v1/mask_stake/twitter/update')
      return authFetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
      })
    },
    onSuccess() {
      queryClient.refetchQueries({ queryKey: ['user-info'] })
      const queryKey = ['staking-ranking-list', poolId]
      const data = queryClient.getQueryData<StakeRankItem[]>(queryKey)

      const address = account.address?.toLowerCase()
      if (data?.some((x) => isSameAddress(x.address, address))) {
        queryClient.refetchQueries({ queryKey })
      }
    },
  })
}
