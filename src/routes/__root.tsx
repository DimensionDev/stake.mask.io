import { createRootRoute, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { Flex } from '@chakra-ui/react'
import { AcceptCookie } from '../components/AcceptCookie.tsx'
import { Modals } from '../modals/index.tsx'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { env } from '../constants/env.ts'

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
