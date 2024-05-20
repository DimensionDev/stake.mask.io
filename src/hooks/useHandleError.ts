import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'
import { BaseError, ContractFunctionExecutionError, TransactionExecutionError, UserRejectedRequestError } from 'viem'

export function useHandleError() {
  const toast = useToast({ status: 'error' })
  return useCallback(
    (err: unknown) => {
      if (!(err instanceof BaseError)) return false
      const cause = err instanceof TransactionExecutionError ? err.cause : err
      if (cause instanceof UserRejectedRequestError) {
        toast({
          title: cause.details,
        })
        return true
      } else if (err instanceof ContractFunctionExecutionError) {
        toast({
          title: err.message,
        })
        return true
      }

      return false
    },
    [toast],
  )
}
