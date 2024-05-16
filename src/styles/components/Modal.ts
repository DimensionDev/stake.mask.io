import { StyleFunctionProps, theme as chakraTheme } from '@chakra-ui/react'

export const Modal = {
  ...chakraTheme.components.Modal,
  defaultProps: {
    ...chakraTheme.components.Modal.defaultProps,
    isCentered: true,
  },
  baseStyle(props: StyleFunctionProps) {
    const baseStyle = chakraTheme.components.Modal.baseStyle?.(props)
    return {
      ...baseStyle,
      overlay: {
        ...baseStyle?.overlay,
        bg: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        outline: 'none',
      },
      dialogContainer: {
        ...baseStyle?.dialogContainer,
        py: 10,
      },
      dialog: {
        ...baseStyle?.dialog,
        bg: 'neutrals.8',
        rounded: '20px',
      },
      body: {
        ...baseStyle?.body,
        pt: 3,
        px: 6,
      },
      header: {
        ...baseStyle?.header,
        fontSize: '32px',
        letterSpacing: '-0.32px',
        lineHeight: '125%',
        fontWeight: 700,
        pt: 6,
        pb: 3,
        px: 6,
      },
      closeButton: {
        ...baseStyle?.closeButton,
        top: 6,
        right: 6,
        p: 2,
        w: 10,
        h: 10,
        rounded: '100%',
        border: '2px solid',
        borderColor: 'neutrals.6',
      },
    }
  },
}
