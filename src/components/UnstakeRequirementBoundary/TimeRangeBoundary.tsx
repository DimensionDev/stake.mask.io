import { ButtonProps } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { PropsWithChildren, memo } from 'react'
import { usePoolInfo } from '../../hooks/usePoolInfo'
import { usePoolState } from '../../hooks/usePoolState'
import { stakeModal } from '../../modals/StakeModal'
import { MaskStakingButton } from '../MaskStakingButton'

interface BoundaryProps extends PropsWithChildren {
  buttonProps?: ButtonProps
}

export const TimeRangeBoundary = memo<BoundaryProps>(function TimeRangeBoundary({ children }) {
  const { data: poolInfo, isLoading: loadingPoolInfo } = usePoolInfo()
  const { isStarted, isEnded, isLoadingPools } = usePoolState(poolInfo)

  if (loadingPoolInfo || isLoadingPools) {
    return <MaskStakingButton rounded={50} isDisabled isLoading loadingText={t`Checking`} />
  }

  if (!isStarted) {
    return <MaskStakingButton isDisabled>{t`Stake Mask`}</MaskStakingButton>
  }

  if (!isEnded) {
    return <MaskStakingButton onClick={() => stakeModal.show()}>{t`Stake Mask`}</MaskStakingButton>
  }

  return <>{children}</>
})
