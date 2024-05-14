import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import './styles/index.css'

import { routeTree } from './routeTree.gen'
import { theme } from './styles/theme.ts'
import { queryClient } from './configs/queryClient.ts'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from './components/WagmiProvider.tsx'
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { setLocale } from './i18n'
import { Locale } from './types'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

setLocale(Locale.en)

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <I18nProvider i18n={i18n}>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <WagmiProvider>
              <RouterProvider router={router} />
            </WagmiProvider>
          </QueryClientProvider>
        </ChakraProvider>
      </I18nProvider>
    </StrictMode>,
  )
}
