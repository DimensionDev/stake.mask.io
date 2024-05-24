import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface AccountState {
  token: string
  updateToken(token: string): void
}

export const useAccountStore = create<AccountState, [['zustand/persist', AccountState], ['zustand/immer', never]]>(
  persist(
    immer((set) => ({
      token: '',
      updateToken: (token: string) => {
        set((state) => {
          state.token = token.trim()
        })
      },
    })),
    {
      name: 'mask-stake-account',
    },
  ),
)
