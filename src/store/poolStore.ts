import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { env } from '@/constants/env'
import { readStakeManager } from '@/helpers/readStakeManager'

interface PollState {
  chainId: number
  poolId: number | null
  maskTokenAddress: `0x${string}`
  stakeManagerAddress: `0x${string}`
  rewardAddress: `0x${string}`
  syncingPoolInfo: boolean
  syncPoolInfo(): Promise<void>
}

const { VITE_STAKE_MANAGER_CONTRACT_ADDRESS, VITE_REWARD_CONTRACT_ADDRESS, VITE_MASK_TOKEN_ADDRESS } = import.meta.env

// We get pool id eagerly.
export const usePoolStore = create<PollState, [['zustand/persist', PollState], ['zustand/immer', never]]>(
  persist(
    immer((set, get) => ({
      chainId: env.external.CHAIN_ID,
      poolId: null,
      syncingPoolInfo: false,
      maskTokenAddress: VITE_MASK_TOKEN_ADDRESS,
      stakeManagerAddress: VITE_STAKE_MANAGER_CONTRACT_ADDRESS,
      rewardAddress: VITE_REWARD_CONTRACT_ADDRESS,
      syncPoolInfo: async () => {
        set((state) => {
          if (env.external.CHAIN_ID) {
            state.chainId = env.external.CHAIN_ID
          }
          state.stakeManagerAddress = VITE_STAKE_MANAGER_CONTRACT_ADDRESS
          state.rewardAddress = VITE_REWARD_CONTRACT_ADDRESS
          state.syncingPoolInfo = true
        })
        const { currentPoolId: poolId, maskTokenAddress } = await readStakeManager()
        set((state) => {
          if (maskTokenAddress) state.maskTokenAddress = maskTokenAddress
          state.syncingPoolInfo = false
          if (poolId !== undefined && get().poolId !== poolId) {
            state.poolId = poolId
          }
        })
      },
    })),
    {
      name: 'mask-stake-pool',
      onRehydrateStorage(state) {
        return () => state.syncPoolInfo()
      },
    },
  ),
)
