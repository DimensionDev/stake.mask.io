interface ImportMetaEnv {
  VITE_MASK_TOKEN_ADDRESS: `0x${string}`
  VITE_STAKE_MANAGER_CONTRACT_ADDRESS: `0x${string}`
  VITE_REWARD_CONTRACT_ADDRESS: `0x${string}`
}

// https://github.com/microsoft/TypeScript/issues/29729#issuecomment-1483854699
interface Nothing {}
// We discard boolean as the default type.
type LiteralUnion<U, T = U extends string ? string : U extends number ? number : never> = U | (T & Nothing)

type HexString = `0x${string}`
