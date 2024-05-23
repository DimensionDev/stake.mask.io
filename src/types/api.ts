interface Response<T> {
  code: number
  reason: string
  message: string
  data: T
}

export type PageableResponse<T> = Response<
  T & {
    page: {
      cursor: string
    }
  }
>

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
  /** '1' for CEX user, '2' for spam user, '3' and '0' for normal user */
  address_type: string
  reward_pool: Array<{
    reward_pool_id: number
    amount: string
    /** token address */
    address: HexString
    big_amount: string
    /** token name */
    name: string
    /** Merkle tree */
    proof: Array<HexString>
  }>
}

export type UserInfoResponse = Response<UserInfo>

export interface PoolInfo {
  pool_id: number
  apr: string
  amount: string
  score: number
  /** in seconds */
  start_time: number
  /** in seconds */
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

export interface NormalizedPoolInfo extends Omit<PoolInfo, 'start_time' | 'end_time'> {
  /** in milliseconds */
  start_time: number
  /** in milliseconds */
  end_time: number
}

export type PoolInfoResponse = Response<PoolInfo>

export interface TwitterAuthorizeResult {
  url: string
}

export type TwitterAuthorizeResponse = Response<TwitterAuthorizeResult>

export type LoginResponse = Response<{
  token: string
}>

export interface StakeRankItem {
  address: string
  twitter_id: string
  twitter_name: string
  twitter_username: string
  twitter_display_name: string
  twitter_image: string
  stake_amount: string
  score: number
}

export type StakeRankResponse = PageableResponse<{ list: StakeRankItem[] }>

export interface UpdateUserInfoParams {
  display_username: string
  show_avatar: boolean
  original_message: string
  signature_message: string
  wallet_address: string
}

export type UpdateUserInfoResponse = Response<string>

export interface AddressSecurity {
  cybercrime: string
  money_laundering: string
  number_of_malicious_contracts_created: string
  gas_abuse: string
  financial_crime: string
  darkweb_transactions: string
  reinit: string
  phishing_activities: string
  contract_address: string
  fake_kyc: string
  blacklist_doubt: string
  fake_standard_interface: string
  data_source: string
  stealing_attack: string
  blackmail_activities: string
  sanctioned: string
  malicious_mining_activities: string
  mixer: string
  fake_token: string
  honeypot_related_address: string
  /** 1 for yes */
  is_black_ip: string
}

export type AddressSecurityResponse = Response<AddressSecurity>
