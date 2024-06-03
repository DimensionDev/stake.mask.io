import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface AccountState {
  tokenMap: Record<string, string>
  updateToken(address: string, token: string): void
  clearToken(): void
}

export const useAccountStore = create<AccountState, [['zustand/persist', AccountState], ['zustand/immer', never]]>(
  persist(
    immer((set) => ({
      tokenMap: {},
      updateToken: (address: string, token: string) => {
        set((state) => {
          const key = address.toLowerCase()
          state.tokenMap[key] = token.trim()
        })
      },
      clearToken() {
        set((state) => {
          state.tokenMap = {}
        })
      },
    })),
    {
      name: 'mask-stake-account',
    },
  ),
)
