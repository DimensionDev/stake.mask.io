import { StyleFunctionProps, theme as chakraTheme } from '@chakra-ui/react'

export const Switch = {
  ...chakraTheme.components.Switch,
  baseStyle(props: StyleFunctionProps) {
    const baseStyle = chakraTheme.components.Switch.baseStyle?.(props)
    return {
      ...baseStyle,
      track: {
        ...baseStyle?.track,
        _checked: {
          ...baseStyle?.track?._checked,
          bg: 'primary.4',
        },
      },
    }
  },
}
