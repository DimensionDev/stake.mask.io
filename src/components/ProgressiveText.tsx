import { Skeleton, SkeletonProps, Text, TextProps } from '@chakra-ui/react'
import { forwardRef, memo, type ReactNode } from 'react'

export interface ProgressiveTextProps extends TextProps {
  loading?: boolean
  skeletonProps?: SkeletonProps
  fallback?: ReactNode
  component?: string
}

export const ProgressiveText = memo(
  forwardRef<HTMLDivElement | HTMLParagraphElement | HTMLSpanElement, ProgressiveTextProps>(function ProgressiveText(
    { loading, skeletonProps, children, fallback = '--', ...props },
    ref,
  ) {
    if (loading) {
      return (
        <Text as="div" {...props}>
          <Skeleton {...skeletonProps} />
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
