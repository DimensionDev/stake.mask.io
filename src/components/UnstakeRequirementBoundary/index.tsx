import { ButtonProps } from '@chakra-ui/react'
import { PropsWithChildren, memo } from 'react'
import { TimeRangeBoundary } from './TimeRangeBoundary'

interface BoundaryProps extends PropsWithChildren {
  buttonProps?: ButtonProps
}

export const UnstakeRequirementBoundary = memo<BoundaryProps>(function UnstakeRequirementBoundary({ children }) {
  return <TimeRangeBoundary>{children}</TimeRangeBoundary>
})
