import { theme as chakraTheme, extendBaseTheme } from '@chakra-ui/react'

import { Drawer } from './components/Drawer.ts'
import { Modal } from './components/Modal.ts'
import { Switch } from './components/Switch.ts'
import { Tabs } from './components/Tabs.ts'

window.localStorage.setItem('chakra-ui-color-mode', 'dark')

export const theme = extendBaseTheme({
  components: {
    ...chakraTheme.components,
    Drawer,
    Modal,
    Tabs,
    Switch,
    Tooltip: {
      ...chakraTheme.components.Tooltip,
      baseStyle() {
        return {
          ...chakraTheme.components.Tooltip.baseStyle,
          _dark: {
            '--tooltip-bg': 'rgba(255, 255, 255, 0.9)',
          },
          color: 'neutrals.8',
          py: 2,
          px: 2,
          borderRadius: '8px',
        }
      },
    },
  },
  sizes: {
    maxW: '1244px',
  },
  colors: {
    black: '#000000',
    white: '#ffffff',
    danger: '#EB2F45',
    neutrals: {
      1: '#FCFCFD',
      2: '#F4F5F6',
      3: '#E6E8EC',
      4: '#B1B5C3',
      5: '#B1B5C3',
      6: '#353945',
      8: '#141414',
      9: '#05050A',
    },
    'flow-line': '#AF9EF8',
    gradient: {
      purple: 'linear-gradient(261deg, #D0D0FF 3.1%, #A996F7 33.87%, #7280FE 54.26%, #D3D6FE 104.35%)',
    },
    primary: {
      3: '#EB2F45',
      4: '#45B26B',
    },
    secondary: {
      1: '#9BD6FF',
      2: '#E4D7CF',
      3: '#FFD166',
      4: '#CDB4DB',
    },
  },
  shadows: {
    card: '0px 5px 10px 0px rgba(0, 0, 0, 0.05), 0px 15px 30px 0px rgba(0, 0, 0, 0.05), 0px 20px 40px 0px rgba(0, 0, 0, 0.05)',
  },
  fonts: {
    input:
      'Inter, SFRounded, ui-rounded, "SF Pro Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  styles: {
    global: () => {
      return {
        body: {
          fontFamily:
            'Inter, SFRounded, ui-rounded, "SF Pro Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          backgroundColor: 'neutrals.9',
          minHeight: '100svh',
        },
      }
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})
