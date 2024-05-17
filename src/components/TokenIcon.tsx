import { Box, BoxProps, Icon, Image } from '@chakra-ui/react'

import Eth from '../assets/eth.svg?react'

// TODO add token info
interface Props extends BoxProps {
  src?: string
  omitChain?: boolean
}

export function TokenIcon({ src, omitChain, ...props }: Props) {
  return (
    <Box width={12} height={12} pos="relative" {...props}>
      <Image
        src={src ?? new URL('../assets/mask-logo.svg', import.meta.url).href}
        rounded="50%"
        width="100%"
        height="100%"
      />
      {omitChain ? null : <Icon as={Eth} w={4} h={4} pos="absolute" right={-1} bottom={0} />}
    </Box>
  )
}
