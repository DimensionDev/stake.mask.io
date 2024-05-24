import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { PoolInfo } from '../types/api'
import { useBlockNumber, useReadContract } from 'wagmi'
import { usePoolStore } from '../store/poolStore'
import { StakeManagerABI } from '../abis/stakeManager'

export function usePoolState(poolInfo: PoolInfo | undefined) {
  const { chainId, poolId, stakeManagerAddress } = usePoolStore()

  const [watch, setWatch] = useState<boolean | { pollingInterval: number }>({ pollingInterval: 60_000 })
  const { data: blockNumber } = useBlockNumber({ chainId, watch })
  const { data: pools, isLoading } = useReadContract({
    chainId,
    abi: StakeManagerABI,
    address: stakeManagerAddress,
    functionName: 'pools',
    args: typeof poolId === 'number' ? [BigInt(poolId)] : undefined,
  })

  const result = useMemo(() => {
    if (!poolInfo || !pools || !blockNumber) return { isStarted: false, isEnded: false }
    const [startBlock, endBlock, , stakingEnabled] = pools
    const isStarted = dayjs(poolInfo.start_time * 1000).isAfter(Date.now()) ? false : startBlock < blockNumber
    const isEnded = dayjs(poolInfo.end_time * 1000).isAfter(Date.now()) ? false : endBlock < blockNumber
    return { isStarted, isEnded: isEnded && !stakingEnabled }
  }, [blockNumber, poolInfo, pools])

  useEffect(() => {
    if (result.isEnded) setWatch(false)
  }, [result.isEnded])

  return { ...result, isLoadingPools: isLoading }
}
