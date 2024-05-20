import { ButtonProps } from '@chakra-ui/react'
import { PropsWithChildren, memo } from 'react'
import { BlackListBoundary } from './BlackListBoundary'
import { TimeRangeBoundary } from './TimeRangeBoundary'
import { MaskBalanceBoundary } from './MaskBalanceBoundary'
import { MaskApproveBoundary } from './MaskApproveBoundary'
import { RegionBoundary } from './RegionBoundary'

interface BoundaryProps extends PropsWithChildren {
  amount: bigint
  buttonProps?: ButtonProps
}

export const StakeRequirementBoundary = memo<BoundaryProps>(function StakeRequirementBoundary({ children, amount }) {
  return (
    <TimeRangeBoundary>
      <BlackListBoundary>
        <RegionBoundary>
          <MaskBalanceBoundary amount={amount}>
            <MaskApproveBoundary amount={amount}>{children}</MaskApproveBoundary>
          </MaskBalanceBoundary>
        </RegionBoundary>
      </BlackListBoundary>
    </TimeRangeBoundary>
  )
})