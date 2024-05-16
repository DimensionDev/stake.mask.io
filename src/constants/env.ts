import { z } from 'zod'

import { NODE_ENV, VERCEL_NEV } from './enum'

const InternalEnvSchema = z.object({})

const ExternalEnvSchema = z.object({
  VERCEL_ENV: z.nativeEnum(VERCEL_NEV).default(VERCEL_NEV.Development),
  W3M_PROJECT_ID: z.string(),
  TWITTER_URL: z.string().default('https://twitter.com/realMaskNetwork'),
  TELEGRAM_URL: z.string().default('https://t.me/maskbook_group#telegram'),
  DISCORD_URL: z.string().default('https://discord.gg/4SVXvj7'),
  FACEBOOK_URL: z.string().default('https://www.facebook.com/masknetwork'),
  REDDIT_URL: z.string().default('https://www.reddit.com/r/MaskNetwork'),
  GITHUB_URL: z.string().default('https://github.com/DimensionDev'),
  YOUTUBE_URL: z.string().default('https://www.youtube.com/c/MaskNetwork'),
  MEDIUM_URL: z.string().default('https://www.youtube.com/c/MaskNetwork'),
})

export const env = {
  shared: {
    NODE_ENV: process.env.NODE_ENV as NODE_ENV,
  },
  internal: (typeof window === 'undefined' ? InternalEnvSchema.parse(process.env) : {}) as z.infer<
    typeof InternalEnvSchema
  >,
  external: ExternalEnvSchema.parse({
    VERCEL_ENV: import.meta.env.VITE_VERCEL_ENV,
    W3M_PROJECT_ID: import.meta.env.VITE_W3M_PROJECT_ID,
    TWITTER_URL: import.meta.env.VITE_TWITTER_URL,
    TELEGRAM_URL: import.meta.env.VITE_TELEGRAM_URL,
    DISCORD_URL: import.meta.env.VITE_DISCORD_URL,
    FACEBOOK_URL: import.meta.env.VITE_FACEBOOK_URL,
    REDDIT_URL: import.meta.env.VITE_REDDIT_URL,
    GITHUB_URL: import.meta.env.VITE_GITHUB_URL,
    YOUTUBE_URL: import.meta.env.VITE_YOUTUBE_URL,
    MEDIUM_URL: import.meta.env.VITE_MEDIUM_URL,
  }),
}
