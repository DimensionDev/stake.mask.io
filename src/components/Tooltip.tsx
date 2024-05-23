import { FC, useMemo } from 'react'
import { Icon, Tooltip as RawTooltip } from '@chakra-ui/react'
import { TooltipProps } from '@chakra-ui/react'
import TooltipArrow from '../assets/tooltip-arrow.svg?react'

export const Tooltip: FC<TooltipProps> = ({ children, label, hasArrow = true, placement = 'top', ...props }) => {
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
