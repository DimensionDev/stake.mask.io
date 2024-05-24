import { ButtonProps } from '@chakra-ui/react'
import { memo, PropsWithChildren } from 'react'

import { TimeRangeBoundary } from '@/components/UnstakeRequirementBoundary/TimeRangeBoundary'

interface BoundaryProps extends PropsWithChildren {
  buttonProps?: ButtonProps
}

export const UnstakeRequirementBoundary = memo<BoundaryProps>(function UnstakeRequirementBoundary({ children }) {
  return <TimeRangeBoundary>{children}</TimeRangeBoundary>
})
