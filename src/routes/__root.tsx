import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Nav } from '../components/Nav'

export const Route = createRootRoute({
  component: () => (
    <>
      <Nav pos="fixed" top={0} left={0} zIndex={99} />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
