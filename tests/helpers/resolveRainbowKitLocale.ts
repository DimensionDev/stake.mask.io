import { describe, it, expect } from 'vitest'
import { resolveRainbowKitLocale } from '../../src/helpers/resolveRainbowKitLocale'
import { Locale } from '../../src/types'

describe('test function resolveRainbowKitLocale', () => {
  it('resolveRainbowKitLocale', () => {
    expect(resolveRainbowKitLocale(Locale.en)).toEqual('en')
  })
})
