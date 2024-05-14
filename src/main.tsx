import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import './styles/index.css'

import { routeTree } from './routeTree.gen'
import { theme } from './styles/theme.ts'
import { queryClient } from './configs/queryClient.ts'
import { ChakraBaseProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from './components/WagmiProvider.tsx'
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { setLocale } from './i18n'
import { Locale } from './types'

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

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
        <ChakraBaseProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <WagmiProvider>
              <RouterProvider router={router} />
            </WagmiProvider>
          </QueryClientProvider>
        </ChakraBaseProvider>
      </I18nProvider>
    </StrictMode>,
  )
}
