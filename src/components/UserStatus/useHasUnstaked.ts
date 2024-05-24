import { parseAbiItem } from 'viem'
import { useAccount, useBlockNumber, usePublicClient } from 'wagmi'
import { usePoolInfo } from '../../hooks/usePoolInfo'
import { usePoolStore } from '../../store/poolStore'
import { useQuery } from '@tanstack/react-query'

export function useHasUnstaked() {
  const { chainId, poolId, stakeManagerAddress } = usePoolStore()
  const account = useAccount()
  const client = usePublicClient({ chainId })
  const { data: toBlock } = useBlockNumber({ chainId })
  const { data: poolInfo } = usePoolInfo()
  const enabled = !!toBlock && !!client && !!poolInfo?.point_acc_end_block
  return useQuery({
    enabled: enabled,
    queryKey: ['has-unstaked', account.address, poolId],
    queryFn: async () => {
      if (!client || !toBlock) return
      const fromBlock = poolInfo?.point_acc_end_block ? BigInt(poolInfo.point_acc_end_block) : toBlock - BigInt(20000)
      const filter = await client.createEventFilter({
        address: stakeManagerAddress,
        event: parseAbiItem('event unstaked(address indexed account, uint8 indexed poolId, uint256 unStakedAmount)'),
        args: {
          account: account.address,
          poolId,
        },
        fromBlock,
        toBlock,
      })

      const logs = await client.getFilterLogs({ filter })
      return logs.length > 0
    },
  })
}