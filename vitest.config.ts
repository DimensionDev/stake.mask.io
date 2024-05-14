import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['./tests/**/*.ts'],
    exclude: ['./tests/**/*.d.ts'],
  },
})
