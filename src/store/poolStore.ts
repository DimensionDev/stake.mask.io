import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { getCurrentPoolId } from '../helpers/getCurrentPoolId'
import { createJSONStorage, persist } from 'zustand/middleware'

interface PollState {
  poolId: number | null
  checkingPoolId: boolean
  updatePollId(poolId: number): void
  syncPoolId(): Promise<void>
}

// We get pool id eagerly.
export const usePoolStore = create<
  PollState,
  [['zustand/persist', PollState], ['zustand/immer', never]]
>(
  persist(
    immer((set, get) => ({
      poolId: null,
      checkingPoolId: false,
      updatePollId: (poolId: number) =>
        set((state) => {
          state.poolId = poolId
        }),
      syncPoolId: async () => {
        set((state) => {
          state.checkingPoolId = true
        })
        const poolId = await getCurrentPoolId()
        if (poolId && get().poolId !== poolId) {
          get().updatePollId(poolId)
        }
        set((state) => {
          state.checkingPoolId = false
        })
      },
    })),
    {
      name: 'mask-stake-pool',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage(state) {
        return () => state.syncPoolId()
      },
    },
  ),
)
