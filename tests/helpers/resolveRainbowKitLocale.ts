import { describe, it, expect } from 'vitest'
import { resolveRainbowKitLocale } from '@/helpers/resolveRainbowKitLocale.ts'
import { Locale } from '@/types/enum.ts'

describe('test function resolveRainbowKitLocale', () => {
  it('resolveRainbowKitLocale', () => {
    expect(resolveRainbowKitLocale(Locale.en)).toEqual('en')
  })
})
