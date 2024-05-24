import { defineConfig } from 'vitest/config'

function createURL(pathToFile: string) {
  return new URL(pathToFile, import.meta.url).pathname
}

export default defineConfig({
  test: {
    alias: {
      '@': createURL('./src'),
    },
    include: ['./tests/**/*.ts'],
    exclude: ['./tests/**/*.d.ts'],
  },
})
