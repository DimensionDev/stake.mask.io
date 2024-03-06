/* cspell:disable */

export const SITE_NAME = 'Stake Your $MASK';
export const SITE_DESCRIPTION = 'Stake Your $MASK';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://stake.mask.social';
export const SITE_HOSTNAME = 'stake.mask.social';

export const EMPTY_LIST = Object.freeze([]) as never[];
export const EMPTY_OBJECT = Object.freeze({}) as Record<string, never>;

export const IS_PRODUCTION = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_VERCEL_ENV === 'development';
export const IS_PREVIEW = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';

// HTTP Cache headers
// Cache for 1 minute, stale for 30 days
export const SWR_CACHE_AGE_1_MIN_30_DAYS = 'public, s-maxage=1, stale-while-revalidate=2592000';
// Cache for 10 minutes, stale for 30 days
export const SWR_CACHE_AGE_10_MINS_30_DAYS = 'public, s-maxage=600, stale-while-revalidate=2592000';
// Cache for 30 days
export const CACHE_AGE_30_DAYS = 'public, s-maxage=2592000';
// Cache indefinitely
export const CACHE_AGE_INDEFINITE = 'public, max-age=31536000, immutable';
// Cache indefinitely on Disk
export const CACHE_AGE_INDEFINITE_ON_DISK = 'public, s-maxage=31536000, max-age=31536000, must-revalidate';
