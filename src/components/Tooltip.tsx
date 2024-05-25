import { Icon, Tooltip as RawTooltip, TooltipProps, useDisclosure, useMergeRefs } from '@chakra-ui/react'
import { cloneElement, ComponentType, ReactElement, Ref, useEffect, useMemo, useRef } from 'react'

import TooltipArrow from '@/assets/tooltip-arrow.svg?react'

interface Props extends TooltipProps {
  children: ReactElement & { ref?: Ref<HTMLElement> }
}

export const Tooltip: ComponentType<Props> = ({ children, label, hasArrow = true, placement = 'top', ...props }) => {
  const { onOpen, onToggle, onClose, isOpen } = useDisclosure()
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

  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current || props.isDisabled) return
    const element = ref.current
    element.addEventListener('mouseenter', onOpen)
    element.addEventListener('mouseleave', onClose)
    return () => {
      element.removeEventListener('mouseenter', onOpen)
      element.removeEventListener('mouseleave', onClose)
    }
  }, [onClose, onOpen, props.isDisabled])

  const refs = useMergeRefs(ref, children.ref)

  return (
    <RawTooltip
      label={
        <>
          {label}
          {arrowIcon}
        </>
      }
      isOpen={isOpen}
      placement={placement}
      onClick={onToggle}
      {...props}
    >
      {cloneElement(children, { ...children.props, ref: refs })}
    </RawTooltip>
  )
}
