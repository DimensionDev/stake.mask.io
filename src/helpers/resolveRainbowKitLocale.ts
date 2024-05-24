import type { Locale as RainbowKitLocale } from '@rainbow-me/rainbowkit'

import { createLookupTableResolver } from '@/helpers/createLookupTableResolver.ts'
import { Locale } from '@/types/enum.ts'

export const resolveRainbowKitLocale = createLookupTableResolver<Locale, RainbowKitLocale>(
  {
    [Locale.en]: 'en',
  },
  'en',
)
