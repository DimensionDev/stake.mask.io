import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/faqs')({
  component: () => <div>Hello /faqs!</div>,
})
