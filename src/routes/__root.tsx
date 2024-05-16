import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { Flex } from '@chakra-ui/react'

export const Route = createRootRoute({
  component: () => (
    <Flex direction="column" w="100%" minH="100svh">
      <Nav pos="fixed" top={0} left={0} zIndex={99} />
      <Nav pos="fixed" top={0} left={0} zIndex={99} />
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
    </Flex>
  ),
})
