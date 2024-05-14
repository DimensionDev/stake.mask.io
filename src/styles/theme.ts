import { extendBaseTheme, theme as chakraTheme } from '@chakra-ui/react'

import { Tabs } from './components/Tabs.ts'

const { Button } = chakraTheme.components

window.localStorage.setItem('chakra-ui-color-mode', 'dark')

export const theme = extendBaseTheme({
  components: {
    Button,
    Tabs,
  },
  colors: {
    neutrals: {
      2: '#F4F5F6',
      5: '#B1B5C3',
    },
    gradient: {
      purple:
        'linear-gradient(261deg, #D0D0FF 3.1%, #A996F7 33.87%, #7280FE 54.26%, #D3D6FE 104.35%)',
    },
  },
  styles: {
    global: () => {
      return {
        body: {
          fontFamily:
            'Inter, SFRounded, ui-rounded, "SF Pro Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          backgroundColor: '#05050A',
        },
      }
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})
