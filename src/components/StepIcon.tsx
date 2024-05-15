import { Box, BoxProps } from '@chakra-ui/react'
import Check from '../assets/check.svg?react'
interface Props extends BoxProps {
  step: number
  completed?: boolean
}
export function StepIcon({ completed, step, ...rest }: Props) {
  if (completed) {
    return (
      <Box
        rounded={4}
        bg="gradient.purple"
        color="neutrals.8"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        {...rest}
      >
        <Check width={24} height={24} />
      </Box>
    )
  }
  return (
    <Box
      rounded={4}
      bg="white"
      color="black"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      fontWeight="bold"
      fontSize={14}
      {...rest}
    >
      {step}
    </Box>
  )
}
