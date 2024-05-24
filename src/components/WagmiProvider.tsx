import '@rainbow-me/rainbowkit/styles.css'

import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { polygon } from 'viem/chains'
import { WagmiProvider as WagmiConfig } from 'wagmi'
import { config } from '../configs/wagmiClient.ts'
import { resolveRainbowKitLocale } from '../helpers/resolveRainbowKitLocale.ts'
import { Locale } from '../types/enum.ts'
import type { PropsWithChildren } from 'react'

export interface WagmiProviderProps extends PropsWithChildren {}

export function WagmiProvider(props: WagmiProviderProps) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider
        locale={resolveRainbowKitLocale(Locale.en)}
        initialChain={polygon}
        showRecentTransactions
        theme={darkTheme()}
      >
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
