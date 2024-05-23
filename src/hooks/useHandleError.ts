import { t } from '@lingui/macro'
import { useCallback } from 'react'
import { BaseError, ContractFunctionExecutionError, TransactionExecutionError, UserRejectedRequestError } from 'viem'
import { useToast } from './useToast'

export function useHandleError() {
  const toast = useToast()
  return useCallback(
    (err: unknown) => {
      if (!(err instanceof BaseError)) return false
      const cause = err instanceof TransactionExecutionError ? err.cause : err
      if (cause instanceof UserRejectedRequestError) {
        toast({
          status: 'error',
          title: t`Error`,
          description: cause.details,
        })
        return true
      } else if (err instanceof ContractFunctionExecutionError) {
        toast({
          status: 'error',
          title: t`Error`,
          description: err.message,
        })
        return true
      }

      return false
    },
    [toast],
  )
}
