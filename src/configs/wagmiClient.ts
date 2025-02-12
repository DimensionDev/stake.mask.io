import { type Chain, connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  coinbaseWallet,
  metaMaskWallet,
  okxWallet,
  rabbyWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { compact } from 'lodash-es'
import { createClient } from 'viem'
import { type Config, createConfig, http } from 'wagmi'
import { mainnet as builtInMainnet, sepolia } from 'wagmi/chains'

import { env } from '@/constants/env'

const mainnet = import.meta.env.VITE_ETH_RPC
  ? ({
      ...builtInMainnet,
      rpcUrls: {
        default: {
          http: [import.meta.env.VITE_ETH_RPC],
        },
      },
    } as const)
  : builtInMainnet

export const chains =
  import.meta.env.VITE_CHANNEL === 'production'
    ? ([mainnet] as const satisfies Chain[])
    : ([mainnet, sepolia] as const satisfies Chain[])

const isFirefox = navigator.userAgent.toLowerCase().includes('firefox')
export const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: compact([
        metaMaskWallet,
        walletConnectWallet,
        coinbaseWallet,
        rabbyWallet,
        !isFirefox ? okxWallet : null, // OKX wallet is not available on Firefox
      ]),
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
    return createClient({
      chain,
      transport: http(undefined, {
        batch: true,
      }),
    })
  },
}) as Config
