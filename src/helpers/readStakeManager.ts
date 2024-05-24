import { readContracts } from 'wagmi/actions'
import { StakeManagerABI } from '../abis/stakeManager'
import { config } from '../configs/wagmiClient'
import { env } from '../constants/env'

const stakeManagerContract = {
  chainId: env.external.CHAIN_ID,
  address: import.meta.env.VITE_STAKE_MANAGER_CONTRACT_ADDRESS,
  abi: StakeManagerABI,
} as const

export async function readStakeManager() {
  const [{ result: currentPoolId }, { result: maskTokenAddress }] = await readContracts(config, {
    contracts: [
      {
        ...stakeManagerContract,
        functionName: 'currentPoolId',
      },
      {
        ...stakeManagerContract,
        functionName: 'maskToken',
      },
    ],
  })
  return { currentPoolId, maskTokenAddress }
}
