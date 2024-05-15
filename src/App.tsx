import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'

import { ChakraBaseProvider } from '@chakra-ui/react'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from './components/WagmiProvider.tsx'
import { queryClient } from './configs/queryClient.ts'
import { Modals } from './modals/index.tsx'
import { routeTree } from './routeTree.gen'
import { theme } from './styles/theme.ts'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function App() {
  return (
    <StrictMode>
      <I18nProvider i18n={i18n}>
        <ChakraBaseProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <WagmiProvider>
              <RouterProvider router={router} />
              <Modals />
            </WagmiProvider>
          </QueryClientProvider>
        </ChakraBaseProvider>
      </I18nProvider>
    </StrictMode>
  )
}
