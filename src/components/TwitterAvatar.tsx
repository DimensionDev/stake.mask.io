import { Box, BoxProps, Center, Icon, Image } from '@chakra-ui/react'

import Twitter from '@/assets/twitter.svg?react'

interface Props extends BoxProps {
  variant?: 'light' | 'dark'
  omitBadge?: boolean
  size?: number | string
  src?: string
}

export function TwitterAvatar({ size, src, variant = 'light', omitBadge, ...props }: Props) {
  const isLight = variant === 'light'
  return (
    <Box pos="relative" width={size} height={size} {...props}>
      <Image
        width={size}
        height={size}
        bg={isLight ? 'gradient.purple' : 'neutrals.6'}
        p="2px"
        borderRadius="50%"
        objectFit="cover"
        draggable={false}
        userSelect="none"
        src={src}
        fallbackSrc={new URL('@/assets/my-default-avatar.svg', import.meta.url).href}
        alt="user name"
      />
      {omitBadge ? null : (
        <Center
          width="14px"
          height="14px"
          pos="absolute"
          bg={isLight ? 'white' : 'neutrals.9'}
          rounded={14}
          right={0}
          bottom="-4px"
          border="1px solid"
          borderColor={isLight ? 'transparent' : 'neutrals.6'}
          color={isLight ? 'black' : 'neutrals.4'}
        >
          <Icon as={Twitter} width="10px" height="10px" />
        </Center>
      )}
    </Box>
  )
}
