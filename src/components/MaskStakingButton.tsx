import { Button, ButtonProps, Icon } from '@chakra-ui/react'

import MaskLogo from '@/assets/mask-logo.svg?react'

interface Props extends ButtonProps {
  disabledIcon?: null | boolean
}
export function MaskStakingButton({ disabledIcon, ...props }: Props) {
  return (
    <Button
      className={`purple-gradient-button ${props.className}`}
      color="neutrals.9"
      rounded={24}
      w="100%"
      leftIcon={disabledIcon ? undefined : <Icon as={MaskLogo} width={6} height={6} />}
      {...props}
    />
  )
}
