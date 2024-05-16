import { sepolia } from 'viem/chains'
import { readContracts } from 'wagmi/actions'
import { StakeManagerABI } from '../abis/stakeManager'
import { config } from '../configs/wagmiClient'

const stakeManagerContract = {
  chainId: sepolia.id,
  address: import.meta.env.STAKE_MANAGER_CONTRACT_ADDRESS || '0xece3ef2bf6f6fa7f13beab519c60a72e92bbd47c',
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
