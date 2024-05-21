import { createStandaloneToast } from '@chakra-ui/react'
import { createElement } from 'react'
import { Toast } from '../components/Toast'

export async function fetchJSON<T = unknown>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  try {
    const url = `https://cors-next.r2d2.to?${encodeURIComponent(input.toString())}`
    const response = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    })
    return response.json()
  } catch (err) {
    if (err instanceof Error && err.message === 'Failed to fetch') {
      const { toast } = createStandaloneToast()
      toast({
        position: 'top-right',
        status: 'error',
        title: err.message,
        render({ title, description }) {
          return createElement(Toast, { status: 'error', title, description })
        },
      })
    }
    throw err
  }
}
