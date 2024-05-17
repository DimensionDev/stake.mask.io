import type { FC } from 'react'
import { Icon, Tooltip as RawTooltip } from '@chakra-ui/react'
import { TooltipProps } from '@chakra-ui/react'
import TooltipArrow from '../assets/tooltip-arrow.svg?react'

export const Tooltip: FC<TooltipProps> = ({ children, label, hasArrow, ...props }) => {
  return (
    <RawTooltip
      label={
        hasArrow && props.placement === 'top' ? (
          <>
            {label}
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
          </>
        ) : (
          label
        )
      }
      hasArrow
      placement="top"
      {...props}
    >
      {children}
    </RawTooltip>
  )
}
