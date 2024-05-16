import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { readStakeManager } from '../helpers/readStakeManager'
import { createJSONStorage, persist } from 'zustand/middleware'

interface PollState {
  poolId: number | null
  maskTokenAddress: `0x${string}` | undefined
  /** @deprecated */
  updatePollId(poolId: number): void
  syncingPoolInfo: boolean
  syncPoolInfo(): Promise<void>
}

// We get pool id eagerly.
export const usePoolStore = create<PollState, [['zustand/persist', PollState], ['zustand/immer', never]]>(
  persist(
    immer((set, get) => ({
      poolId: null,
      syncingPoolInfo: false,
      maskTokenAddress: import.meta.env.MASK_TOKEN_ADDRESS,
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
          state.maskTokenAddress = maskTokenAddress
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
