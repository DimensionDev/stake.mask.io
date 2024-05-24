import { useToast as useRawToast, UseToastOptions } from '@chakra-ui/react'
import { useCallback } from 'react'

import { Toast, ToastProps } from '@/components/Toast'

export interface ToastOptions extends Omit<UseToastOptions, 'render' | 'status'> {
  status: ToastProps['status']
}

export function useToast(options?: UseToastOptions) {
  const toast = useRawToast(options)
  return useCallback(
    (options: ToastOptions) => {
      return toast({
        ...options,
        render({ title, description }) {
          return <Toast status={options?.status ?? 'loading'} title={title} description={description} />
        },
        containerStyle: {
          minW: 'unset',
          maxW: 500,
          maxH: 300,
        },
      })
    },
    [toast],
  )
}
