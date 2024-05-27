import { Icon, Tooltip as RawTooltip, TooltipProps } from '@chakra-ui/react'
import { ComponentType, ReactElement, Ref, useMemo } from 'react'

import TooltipArrow from '@/assets/tooltip-arrow.svg?react'

interface Props extends TooltipProps {
  children: ReactElement & { ref?: Ref<HTMLElement> }
}

export const Tooltip: ComponentType<Props> = ({ children, label, hasArrow = true, placement = 'top', ...props }) => {
  const arrowIcon = useMemo(() => {
    if (hasArrow) {
      if (placement === 'top') {
        return (
          <Icon
            as={TooltipArrow}
            w="12px"
            h="6px"
            pos="absolute"
            bottom="1px"
            left="50%"
            transform="translateX(-50%) translateY(100%)"
            color="var(--tooltip-bg)"
          />
        )
      }
      if (placement === 'bottom') {
        return (
          <Icon
            as={TooltipArrow}
            w="12px"
            h="6px"
            pos="absolute"
            top="1px"
            left="50%"
            transform="translateX(-50%) translateY(-100%) rotate(180deg)"
            color="var(--tooltip-bg)"
          />
        )
      }
    }
    return null
  }, [hasArrow, placement])

  return (
    <RawTooltip
      label={
        <>
          {label}
          {arrowIcon}
        </>
      }
      placement={placement}
      {...props}
    >
      {children}
    </RawTooltip>
  )
}
