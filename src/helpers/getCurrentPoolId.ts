import { sepolia } from 'viem/chains'
import { readContract } from 'wagmi/actions'
import { StakeManagerABI } from '../abis/stakeManager'
import { config } from '../configs/wagmiClient'

export async function getCurrentPoolId() {
  const result = await readContract(config, {
    chainId: sepolia.id,
    address: '0xece3ef2bf6f6fa7f13beab519c60a72e92bbd47c',
    abi: StakeManagerABI,
    functionName: 'currentPoolId',
  })
  console.log('poolId', result)
  return result
}
