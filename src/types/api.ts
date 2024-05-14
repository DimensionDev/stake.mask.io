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
  address_type: string
  reward_pool: {
    reward_pool_id: number
    amount: string
    big_amount: string
    /** token name */
    name: string
    /** Merkle tree */
    proof: string[]
  }
}

export type UserInfoResponse = Response<UserInfo>
