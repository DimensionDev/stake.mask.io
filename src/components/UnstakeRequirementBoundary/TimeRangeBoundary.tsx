import { ButtonProps } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { PropsWithChildren, memo, useEffect, useMemo, useState } from 'react'
import { useBlockNumber, useReadContract } from 'wagmi'
import { StakeManagerABI } from '../../abis/stakeManager'
import { usePoolInfo } from '../../hooks/usePoolInfo'
import { stakeModal } from '../../modals/StakeModal'
import { usePoolStore } from '../../store/poolStore'
import { MaskStakingButton } from '../MaskStakingButton'

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
  const [watch, setWatch] = useState<boolean | { pollingInterval: number }>({ pollingInterval: 60_000 })
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
    setWatch(!hasEnded)
  }, [hasEnded])

  if (loadingPoolInfo || loadingPools) {
    return <MaskStakingButton rounded={50} isDisabled isLoading loadingText={t`Checking`} />
  }

  if (!hasStarted) {
    return <MaskStakingButton isDisabled>{t`Stake Mask`}</MaskStakingButton>
  }

  if (!hasEnded) {
    return <MaskStakingButton onClick={() => stakeModal.show()}>{t`Stake Mask`}</MaskStakingButton>
  }

  return <>{children}</>
})
