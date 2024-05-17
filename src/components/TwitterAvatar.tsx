import { Box, BoxProps, Center, Icon, Image } from '@chakra-ui/react'

import Twitter from '../assets/twitter.svg?react'

interface Props extends BoxProps {
  omitBadge?: boolean
  size?: number
  src?: string
}

export function TwitterAvatar({ size, src, omitBadge, ...props }: Props) {
  return (
    <Box pos="relative" width={size} height={size} {...props}>
      <Image
        width={size}
        height={size}
        border="2px solid"
        borderColor="gradient.purple"
        borderRadius="50%"
        objectFit="cover"
        draggable={false}
        userSelect="none"
        src={src}
        fallbackSrc={new URL('../assets/default-avatar.svg', import.meta.url).href}
        alt="user name"
      />
      {omitBadge ? null : (
        <Center width="14px" height="14px" pos="absolute" bg="white" rounded={14} right={0} bottom="-4px" color="black">
          <Icon as={Twitter} width="10px" height="10px" />
        </Center>
      )}
    </Box>
  )
}
