import { cloneElement, memo, type ReactElement } from 'react'
import { Tooltip, TooltipProps } from '@chakra-ui/react'
import { useDetectOverflow } from '../hooks/useDetectOverflow'

interface TextOverflowTooltipProps extends TooltipProps {
  children: ReactElement
}

export const TextOverflowTooltip = memo(({ children, ...rest }: TextOverflowTooltipProps) => {
  const [overflow, ref] = useDetectOverflow()

  return (
    <Tooltip {...rest} label={overflow ? rest.label : ''}>
      {cloneElement(children, { ...children.props, ref })}
    </Tooltip>
  )
})

TextOverflowTooltip.displayName = 'TextOverflowTooltip'
