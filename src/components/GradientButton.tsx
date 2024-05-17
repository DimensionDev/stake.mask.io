import { Button, ButtonProps } from '@chakra-ui/react'

export function GradientButton(props: ButtonProps) {
  return (
    <Button
      bg="gradient.purple"
      color="neutrals.8"
      _hover={{ transform: 'scale(1.05)' }}
      _active={{ transform: 'scale(0.95)' }}
      fontSize="14px"
      rounded="100px"
      px={6}
      {...props}
    />
  )
}
