export const Tabs = {
  variants: {
    nav: () => {
      return {
        tablist: {
          display: 'flex',
          gap: 9,
          border: 'none',
        },
        tab: {
          fontWeight: 700,
          fontSize: 'sm',
          pb: '4px',
          lineHeight: '16px',
          color: 'neutrals.5',
          pos: 'relative',
          transition: '200ms',
          _selected: {
            color: 'neutrals.2',
            _before: {
              bg: 'gradient.purple',
            },
          },
          _before: {
            content: "' '",
            display: 'block',
            pos: 'absolute',
            bottom: 0,
            left: 0,
            w: '100%',
            h: '2px',
            bg: 'transparent',
            transition: '200ms',
          },
        },
      }
    },
  },
}
