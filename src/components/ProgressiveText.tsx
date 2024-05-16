import { Text, TextProps, Skeleton } from '@chakra-ui/react'
import { forwardRef, memo, type ReactNode } from 'react'

export interface ProgressiveTextProps extends TextProps {
  loading?: boolean
  skeletonWidth?: string | number
  skeletonHeight?: string | number
  fallback?: ReactNode
  component?: string
}

export const ProgressiveText = memo(
  forwardRef<HTMLDivElement | HTMLParagraphElement | HTMLSpanElement, ProgressiveTextProps>(function ProgressiveText(
    { loading, skeletonWidth, skeletonHeight, children, fallback = '--', ...props },
    ref,
  ) {
    if (loading) {
      return (
        <Text {...props}>
          <Skeleton height={skeletonHeight ?? '1.5em'} width={skeletonWidth ?? '100%'} />
        </Text>
      )
    }

    return (
      <Text {...props} ref={ref}>
        {children ?? fallback}
      </Text>
    )
  }),
)
