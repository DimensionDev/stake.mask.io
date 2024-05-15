import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: () => <div style={{ paddingTop: '120px' }}>Hello /about!</div>,
})
