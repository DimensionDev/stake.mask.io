import { getEnumAsArray } from '@masknet/kit';
import { cookies } from 'next/headers.js';

import { getCookie } from '@/helpers/getCookie.js';
import { defaultLocale } from '@/i18n/index.js';
import { Locale } from '@/types/index.js';

function resolveLocale(locale: string): Locale {
    return getEnumAsArray(Locale).some(({ value }) => value === locale) ? (locale as Locale) : defaultLocale;
}

export function getLocaleFromCookies() {
    const localeFromCookies =
        typeof document === 'undefined' ? cookies().get('locale')?.value : (getCookie('locale') as Locale | undefined);
    return localeFromCookies ? resolveLocale(localeFromCookies) : defaultLocale;
}
