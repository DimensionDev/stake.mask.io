import { CreateToastFnReturn, useToast as useRawToast, UseToastOptions } from '@chakra-ui/react'
import { useMemo } from 'react'

import { Toast, ToastProps } from '@/components/Toast'

export interface ToastOptions extends Omit<UseToastOptions, 'render' | 'status'> {
  status: ToastProps['status']
}

export function useToast(options?: UseToastOptions): CreateToastFnReturn {
  const rawToast = useRawToast(options)
  return useMemo(() => {
    function toast(options: ToastOptions) {
      const toast = rawToast({
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
      Object.assign(toast, rawToast)
      return toast
    }
    return toast as CreateToastFnReturn
  }, [rawToast])
}
