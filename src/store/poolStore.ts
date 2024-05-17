import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { readStakeManager } from '../helpers/readStakeManager'
import { createJSONStorage, persist } from 'zustand/middleware'

interface PollState {
  poolId: number | null
  maskTokenAddress: `0x${string}`
  stakeManagerAddress: `0x${string}`
  rewardAddress: `0x${string}`
  /** @deprecated */
  updatePollId(poolId: number): void
  syncingPoolInfo: boolean
  syncPoolInfo(): Promise<void>
}

const { VITE_STAKE_MANAGER_CONTRACT_ADDRESS, VITE_REWARD_CONTRACT_ADDRESS, VITE_MASK_TOKEN_ADDRESS } = import.meta.env

// We get pool id eagerly.
export const usePoolStore = create<PollState, [['zustand/persist', PollState], ['zustand/immer', never]]>(
  persist(
    immer((set, get) => ({
      poolId: null,
      syncingPoolInfo: false,
      maskTokenAddress: VITE_MASK_TOKEN_ADDRESS,
      stakeManagerAddress: VITE_STAKE_MANAGER_CONTRACT_ADDRESS || '0xece3ef2bf6f6fa7f13beab519c60a72e92bbd47c',
      rewardAddress: VITE_REWARD_CONTRACT_ADDRESS || '0xf0c196D1b1489738Cda956e994e82EF6897e85bC',
      /** @deprecated */
      updatePollId: (poolId: number) =>
        set((state) => {
          state.poolId = poolId
        }),
      syncPoolInfo: async () => {
        set((state) => {
          state.syncingPoolInfo = true
        })
        const { currentPoolId: poolId, maskTokenAddress } = await readStakeManager()
        set((state) => {
          if (maskTokenAddress) state.maskTokenAddress = maskTokenAddress
          state.syncingPoolInfo = false
          if (poolId && get().poolId !== poolId) {
            state.poolId = poolId
          }
        })
      },
    })),
    {
      name: 'mask-stake-pool',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage(state) {
        return () => state.syncPoolInfo()
      },
    },
  ),
)
