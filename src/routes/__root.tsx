import { Flex } from '@chakra-ui/react'
import { createRootRoute, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

import { AcceptCookie } from '@/components/AcceptCookie.tsx'
import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'
import { env } from '@/constants/env.ts'
import { Modals } from '@/modals/index.tsx'

export const Route = createRootRoute({
  component: () => (
    <Flex direction="column" w="100%" minH="100svh">
      <Nav pos="fixed" top={0} left={0} zIndex={99} />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <AcceptCookie />
      {env.shared.NODE_ENV === 'development' ? <TanStackRouterDevtools initialIsOpen={false} /> : null}
      <Modals />
    </Flex>
  ),
})
