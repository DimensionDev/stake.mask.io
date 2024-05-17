import { useAccount, useReadContract } from 'wagmi'
import { usePoolStore } from '../store/poolStore'
import { erc20Abi } from 'viem'

export function useMaskAllowance() {
  const { maskTokenAddress, stakeManagerAddress } = usePoolStore()
  const account = useAccount()

  return useReadContract({
    abi: erc20Abi,
    address: maskTokenAddress,
    functionName: 'allowance',
    args: account.address && stakeManagerAddress ? [account.address, stakeManagerAddress] : undefined,
  })
}
