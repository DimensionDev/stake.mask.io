import { i18n, type Messages } from '@lingui/core'
import dayjs from 'dayjs'

import { messages as en } from '../locales/en.ts'
import { Locale } from '../types/enum.ts'

const locales: Record<Locale, Messages> = {
  [Locale.en]: en,
}

export const supportedLocales: Record<Locale, string> = {
  [Locale.en]: 'English',
}

export const defaultLocale = Locale.en

export function setLocale(locale: Locale) {
  if (!Object.prototype.hasOwnProperty.call(supportedLocales, locale)) {
    console.error(`[i18n]: unknown locale ${locale}`)
    locale = defaultLocale
  } else {
    console.log(`[i18n]: locale ${locale}`)
  }

  i18n.load(locale, locales[locale])
  i18n.activate(locale, [Locale.en])
  dayjs.locale(locale)
}

export function getLocale(locale: Locale) {
  return locales[locale]
}
