import { Box, BoxProps, Image } from '@chakra-ui/react'

// TODO add token info
interface Props extends BoxProps {
  omitChain?: boolean
}

export function TokenIcon({ omitChain, ...props }: Props) {
  return (
    <Box width={12} height={12} pos="relative" {...props}>
      <Image src={new URL('../assets/mask-logo.svg', import.meta.url).href} rounded="50%" width="100%" height="100%" />
      {omitChain ? null : (
        <Image
          src={new URL('../assets/mask-logo.svg', import.meta.url).href}
          rounded="50%"
          pos="absolute"
          right={-1}
          bottom={0}
          width={4}
          height={4}
          border="1px solid"
          borderColor="neutrals.6"
        />
      )}
    </Box>
  )
}
