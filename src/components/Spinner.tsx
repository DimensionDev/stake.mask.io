import type { FC } from 'react'
import LoadingSpinnerSVG from '../assets/loading-spinner.svg?react'
import { Icon, type IconProps, keyframes } from '@chakra-ui/react'

export interface SpinnerProps extends IconProps {}

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Spinner: FC<SpinnerProps> = ({ ...props }) => {
  return (
    <Icon as={LoadingSpinnerSVG} color="neutrals.3" animation={`${spinnerAnimation} 2s linear infinite`} {...props} />
  )
}
