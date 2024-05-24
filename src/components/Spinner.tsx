import { Icon, type IconProps, keyframes } from '@chakra-ui/react'
import { ComponentType } from 'react'

import LoadingSpinnerSVG from '@/assets/loading-spinner.svg?react'

export interface SpinnerProps extends IconProps {}

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Spinner: ComponentType<SpinnerProps> = ({ ...props }) => {
  return (
    <Icon as={LoadingSpinnerSVG} color="neutrals.3" animation={`${spinnerAnimation} 2s linear infinite`} {...props} />
  )
}
