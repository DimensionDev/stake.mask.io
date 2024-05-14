import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme.ts'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../configs/queryClient.ts'

export const Route = createRootRoute({
  component: () => (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <TanStackRouterDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  ),
})
