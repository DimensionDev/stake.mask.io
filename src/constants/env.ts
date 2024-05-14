import { z } from 'zod'

import { NODE_ENV, VERCEL_NEV } from './enum'

const InternalEnvSchema = z.object({})

const ExternalEnvSchema = z.object({
  VERCEL_ENV: z.nativeEnum(VERCEL_NEV).default(VERCEL_NEV.Development),
  W3M_PROJECT_ID: z.string(),
})

export const env = {
  shared: {
    NODE_ENV: process.env.NODE_ENV as NODE_ENV,
  },
  internal: (typeof window === 'undefined'
    ? InternalEnvSchema.parse(process.env)
    : {}) as z.infer<typeof InternalEnvSchema>,
  external: ExternalEnvSchema.parse({
    VERCEL_ENV: import.meta.env.VITE_VERCEL_ENV,
    W3M_PROJECT_ID: import.meta.env.VITE_W3M_PROJECT_ID,
  }),
}
