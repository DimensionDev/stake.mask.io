import { useQuery } from '@tanstack/react-query'
import { parseAbiItem } from 'viem'
import { useAccount, useBlockNumber, usePublicClient } from 'wagmi'

import { usePoolInfo } from '@/hooks/usePoolInfo'
import { usePoolStore } from '@/store/poolStore'

export function useHasUnstaked() {
  const { chainId, poolId, stakeManagerAddress } = usePoolStore()
  const account = useAccount()
  const client = usePublicClient({ chainId })
  const { data: toBlock } = useBlockNumber({ chainId })
  const { data: poolInfo } = usePoolInfo()
  return useQuery({
    enabled: !!client,
    queryKey: ['has-unstaked', account.address, poolId, toBlock?.toString()],
    queryFn: async () => {
      if (!client || !toBlock) return null
      const fromBlock = poolInfo?.point_acc_end_block ? BigInt(poolInfo.point_acc_end_block) : toBlock - BigInt(20000)
      const filter = await client.createEventFilter({
        address: stakeManagerAddress,
        event: parseAbiItem('event unstaked(address indexed account, uint8 indexed poolId, uint256 unStakedAmount)'),
        args: {
          account: account.address,
          poolId,
        },
        fromBlock,
        toBlock: 'latest',
      })

      const logs = await client.getFilterLogs({ filter })
      return logs.length > 0
    },
  })
}
