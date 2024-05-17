import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'

import { ChakraBaseProvider, ToastProviderProps } from '@chakra-ui/react'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from './components/WagmiProvider.tsx'
import { queryClient } from './configs/queryClient.ts'
import { routeTree } from './routeTree.gen'
import { theme } from './styles/theme.ts'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const toastOptions = {
  defaultOptions: { position: 'top-right' },
} satisfies ToastProviderProps
export function App() {
  return (
    <StrictMode>
      <I18nProvider i18n={i18n}>
        <ChakraBaseProvider theme={theme} toastOptions={toastOptions}>
          <QueryClientProvider client={queryClient}>
            <WagmiProvider>
              <RouterProvider router={router} />
              <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
            </WagmiProvider>
          </QueryClientProvider>
        </ChakraBaseProvider>
      </I18nProvider>
    </StrictMode>
  )
}
