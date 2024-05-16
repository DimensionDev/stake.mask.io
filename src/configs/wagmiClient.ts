import { connectorsForWallets, type Chain } from '@rainbow-me/rainbowkit'
import {
  coinbaseWallet,
  metaMaskWallet,
  okxWallet,
  rabbyWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { createClient, http } from 'viem'
import { createConfig, type Config } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

import { env } from '../constants/env'

export const chains = [mainnet, sepolia] as const satisfies Chain[]

export const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, walletConnectWallet, coinbaseWallet, rabbyWallet, okxWallet],
    },
  ],
  {
    projectId: env.external.W3M_PROJECT_ID,
    appName: 'stake.mask.io',
  },
)

export const config = createConfig({
  chains,
  connectors,
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
}) as Config
