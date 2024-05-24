import { TooltipProps } from '@chakra-ui/react'
import { cloneElement, memo } from 'react'

import { Tooltip } from '@/components/Tooltip'
import { useDetectOverflow } from '@/hooks/useDetectOverflow'

interface TextOverflowTooltipProps extends TooltipProps {
  children: ReactNode
}

export const TextOverflowTooltip = memo(({ children, ...rest }: TextOverflowTooltipProps) => {
  const [overflow, ref] = useDetectOverflow()

  return (
    <Tooltip {...rest} label={overflow ? rest.label : ''} isDisabled={!overflow}>
      {cloneElement(children, { ...children.props, ref })}
    </Tooltip>
  )
})

TextOverflowTooltip.displayName = 'TextOverflowTooltip'
