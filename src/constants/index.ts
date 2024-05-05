/* cspell:disable */

import { StakeManagerABI } from '@/abis/stakeManager.js';
import { erc20ABI as TOKEN_ABI } from '@/abis/erc20.js';
import { rewardABI as REWARD_ABI } from '@/abis/reward.js';

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

export const MASK_TOKEN_ADDRESS = '0x69af81e73A73B40adF4f3d4223Cd9b1ECE623074' as `0x${string}`;
export const MASK_TOKEN_ADDRESS_TESTNET = '0x34cbae8f53af6d7b50656137e773a29754f01f13' as `0x${string}`;

export const REWARD_TOKEN_TEST = '0x19bE64Ced7cDD14984198a7F971462c69046c6A4' as `0x${string}`;
export const REWARD_TOKEN = '0x19bE64Ced7cDD14984198a7F971462c69046c6A4' as `0x${string}`;
export const STAKE_MANAGER_TEST = '0xece3ef2bf6f6fa7f13beab519c60a72e92bbd47c' as `0x${string}`;
export const STAKE_MANAGER = '0xece3ef2bf6f6fa7f13beab519c60a72e92bbd47c' as `0x${string}`;
export const REWARD_TEST = '0xf0c196d1b1489738cda956e994e82ef6897e85bc' as `0x${string}`;
export const REWARD = '0xf0c196d1b1489738cda956e994e82ef6897e85bc' as `0x${string}`;

export const BASE_URL = 'https://masknetwork-dev.firefly.land/v1/mask_stake';

export const IS_TESTNET = process.env.NEXT_PUBLIC_TEST;

export const STAKE_MANAGER_CONTRACT = {
    address: IS_TESTNET ? STAKE_MANAGER_TEST : STAKE_MANAGER,
    abi: StakeManagerABI,
    chainId: IS_TESTNET ? 11155111 : 1,
};

export const MASK_TOKEN_CONTRACT = {
    address: IS_TESTNET ? MASK_TOKEN_ADDRESS_TESTNET : MASK_TOKEN_ADDRESS,
    chainId: IS_TESTNET ? 11155111 : 1,
    abi: TOKEN_ABI,
};

export const REWARD_CONTRACT = {
    address: IS_TESTNET ? REWARD_TEST : REWARD,
    chainId: IS_TESTNET ? 11155111 : 1,
    abi: REWARD_ABI,
};

export const POOL_ID = 1;
