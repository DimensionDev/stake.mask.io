interface Response<T> {
  code: number
  reason: string
  message: string
  data: T
}

export interface UserInfo {
  /** score calculated in schedule, inaccurate */
  score: number
  /** score calculated in realtime */
  realtime_score: number
  score_per_hour: number

  /** score calculated in schedule, inaccurate */
  amount: number
  realtime_amount: number
  /** score calculated in realtime */
  twitter_id: string
  twitter_name: string
  twitter_username: string
  twitter_display_name: string
  twitter_image: string
  twitter_show_image: boolean
  address_type: string
  reward_pool: Array<{
    reward_pool_id: number
    amount: string
    big_amount: string
    /** token name */
    name: string
    /** Merkle tree */
    proof: Array<`0x${string}`>
  }>
}

export type UserInfoResponse = Response<UserInfo>

export interface PoolInfo {
  pool_id: number
  apr: string
  amount: string
  score: number
  start_time: number
  end_time: number
  un_locked: boolean
  staking_enabled: boolean
  point_acc_start_block: number
  point_acc_end_block: number
  is_current_pool_id: boolean
  reward_pool: {
    [token_address: string]: {
      /** symbol */
      name: string
      amount: string
      address: string
      big_amount: string
      reward_pool_id: number
    }
  }
}

export type PoolInfoResponse = Response<PoolInfo>

export interface TwitterAuthorizeResult {
  url: string
}

export type TwitterAuthorizeResponse = Response<TwitterAuthorizeResult>

export interface UpdateUserInfoParams {
  display_username: string
  show_avatar: boolean
  original_message: string
  signature_message: string
  wallet_address: string
}

export type UpdateUserInfoResponse = Response<string>
