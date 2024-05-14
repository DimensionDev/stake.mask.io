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
    black: '#000000',
    neutrals: {
      1: '#FCFCFD',
      2: '#F4F5F6',
      5: '#B1B5C3',
      6: '#353945',
      8: '#141414',
      9: '#05050A',
    },
    gradient: {
      purple:
        'linear-gradient(261deg, #D0D0FF 3.1%, #A996F7 33.87%, #7280FE 54.26%, #D3D6FE 104.35%)',
    },
  },
  shadows: {
    card: '0px 5px 10px 0px rgba(0, 0, 0, 0.05), 0px 15px 30px 0px rgba(0, 0, 0, 0.05), 0px 20px 40px 0px rgba(0, 0, 0, 0.05)',
  },
  styles: {
    global: () => {
      return {
        body: {
          fontFamily:
            'Inter, SFRounded, ui-rounded, "SF Pro Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          backgroundColor: 'neutrals.9',
        },
      }
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})
