import { ButtonProps } from '@chakra-ui/react'
import { memo, PropsWithChildren } from 'react'

import { BlackListBoundary } from '@/components/StakeRequirementBoundary/BlackListBoundary'
import { ConnectBoundary } from '@/components/StakeRequirementBoundary/ConnectBoundary'
import { MaskApproveBoundary } from '@/components/StakeRequirementBoundary/MaskApproveBoundary'
import { MaskBalanceBoundary } from '@/components/StakeRequirementBoundary/MaskBalanceBoundary'
import { RegionBoundary } from '@/components/StakeRequirementBoundary/RegionBoundary'
import { TimeRangeBoundary } from '@/components/StakeRequirementBoundary/TimeRangeBoundary'

interface BoundaryProps extends PropsWithChildren {
  amount: bigint
  buttonProps?: ButtonProps
}

export const StakeRequirementBoundary = memo<BoundaryProps>(function StakeRequirementBoundary({ children, amount }) {
  return (
    <TimeRangeBoundary>
      <ConnectBoundary>
        <BlackListBoundary>
          <RegionBoundary>
            <MaskBalanceBoundary amount={amount}>
              <MaskApproveBoundary amount={amount}>{children}</MaskApproveBoundary>
            </MaskBalanceBoundary>
          </RegionBoundary>
        </BlackListBoundary>
      </ConnectBoundary>
    </TimeRangeBoundary>
  )
})
