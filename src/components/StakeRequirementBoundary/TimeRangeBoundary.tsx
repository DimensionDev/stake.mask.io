import { Button, ButtonProps } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { PropsWithChildren, memo, useEffect, useMemo, useState } from 'react'
import { useBlockNumber, useReadContract } from 'wagmi'
import { StakeManagerABI } from '../../abis/stakeManager'
import { usePoolInfo } from '../../hooks/usePoolInfo'
import { usePoolStore } from '../../store/poolStore'

interface BoundaryProps extends PropsWithChildren {
  buttonProps?: ButtonProps
}

export const TimeRangeBoundary = memo<BoundaryProps>(function TimeRangeBoundary({ children }) {
  const { data: poolInfo, isLoading: loadingPoolInfo } = usePoolInfo()
  const { poolId, stakeManagerAddress } = usePoolStore()
  const { data, isLoading: loadingPools } = useReadContract({
    abi: StakeManagerABI,
    address: stakeManagerAddress,
    functionName: 'pools',
    args: poolId ? [BigInt(poolId)] : undefined,
  })
  const [watch, setWatch] = useState(true)
  const { data: blockNumber } = useBlockNumber({ watch })

  const hasStarted = useMemo(() => {
    if (!data || !poolInfo || !blockNumber) return false
    if (poolInfo.start_time * 1000 > Date.now()) return false
    const [startBlock] = data
    return startBlock < blockNumber
  }, [data, poolInfo, blockNumber])

  const hasEnded = useMemo(() => {
    if (!data || !poolInfo || !blockNumber) return false
    if (poolInfo.end_time * 1000 < Date.now()) return true
    const [, endBlock] = data
    return endBlock < blockNumber
  }, [data, poolInfo, blockNumber])

  useEffect(() => {
    setWatch(hasStarted && !hasEnded)
  }, [hasStarted, hasEnded])

  if (loadingPoolInfo || loadingPools) {
    return <Button w="100%" colorScheme="red" rounded={50} disabled isLoading loadingText={t`Checking`} mt="10px" />
  }

  if (!hasStarted) {
    return <Button isDisabled rounded={50} className="purple-gradient-button" w="100%">{t`Not started yet.`}</Button>
  }

  if (hasEnded) {
    return <Button isDisabled rounded={50} className="purple-gradient-button" w="100%">{t`Ended`}</Button>
  }

  return <>{children}</>
})