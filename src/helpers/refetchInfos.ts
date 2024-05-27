import { queryClient } from '@/configs/queryClient'

export function refetchInfos() {
  return Promise.allSettled([
    queryClient.refetchQueries({ queryKey: ['pool-info'] }),
    queryClient.refetchQueries({ queryKey: ['user-info'] }),
  ])
}
