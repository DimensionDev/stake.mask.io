import { extendBaseTheme, theme as chakraTheme } from '@chakra-ui/react'

import { Tabs } from './components/Tabs.ts'

window.localStorage.setItem('chakra-ui-color-mode', 'dark')

export const theme = extendBaseTheme({
  components: {
    ...chakraTheme.components,
    Tabs,
  },
  sizes: {
    maxW: '1244px',
  },
  colors: {
    black: '#000000',
    white: '#fffff',
    danger: '#EB2F45',
    neutrals: {
      1: '#FCFCFD',
      2: '#F4F5F6',
      4: '#B1B5C3',
      5: '#B1B5C3',
      6: '#353945',
      8: '#141414',
      9: '#05050A',
    },
    gradient: {
      purple: 'linear-gradient(261deg, #D0D0FF 3.1%, #A996F7 33.87%, #7280FE 54.26%, #D3D6FE 104.35%)',
      leftAngular:
        'conic-gradient(from 90deg at 40.63% 50.41%, rgba(242, 98, 181, 0.00) 125.17920970916748deg, rgba(95, 197, 255, 0.70) 193.4119462966919deg, rgba(255, 172, 137, 0.70) 216.0206937789917deg, rgba(129, 85, 255, 0.70) 236.0708713531494deg, rgba(120, 157, 255, 0.70) 259.95326042175293deg, rgba(159, 115, 241, 0.00) 311.0780096054077deg)',
      rightAngular:
        'conic-gradient(from 187deg at 40.63% 50.41%, rgba(242, 98, 181, 0.00) 125.17920970916748deg, rgba(95, 197, 255, 0.40) 193.4119462966919deg, rgba(255, 172, 137, 0.40) 216.0206937789917deg, rgba(129, 85, 255, 0.40) 236.0708713531494deg, rgba(120, 157, 255, 0.40) 259.95326042175293deg, rgba(159, 115, 241, 0.00) 311.0780096054077deg)',
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
