import { erc20Abi } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

import { usePoolStore } from '@/store/poolStore'

export function useMaskAllowance() {
  const { chainId, maskTokenAddress, stakeManagerAddress } = usePoolStore()
  const account = useAccount()

  return useReadContract({
    chainId,
    abi: erc20Abi,
    address: maskTokenAddress,
    functionName: 'allowance',
    args: account.address && stakeManagerAddress ? [account.address, stakeManagerAddress] : undefined,
  })
}
