import type { Locale as RainbowKitLocale } from '@rainbow-me/rainbowkit'

import { createLookupTableResolver } from './createLookupTableResolver.ts'
import { Locale } from '../types'

export const resolveRainbowKitLocale = createLookupTableResolver<
  Locale,
  RainbowKitLocale
>(
  {
    [Locale.en]: 'en',
  },
  'en',
)
