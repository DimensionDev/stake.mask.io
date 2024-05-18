import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'
import { TransactionExecutionError, UserRejectedRequestError } from 'viem'

export function useHandleError() {
  const toast = useToast()
  return useCallback((err: unknown) => {
    const cause = err instanceof TransactionExecutionError ? err.cause : err
    if (cause instanceof UserRejectedRequestError) {
      toast({
        status: 'error',
        title: cause.details,
      })
      return true
    }
    return false
  }, [])
}
