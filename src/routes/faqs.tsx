import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/faqs')({
  component: () => <div style={{ paddingTop: '120px' }}>Hello /faqs!</div>,
})
