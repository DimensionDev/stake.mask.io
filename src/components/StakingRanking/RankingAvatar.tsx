import type { FC, ReactNode } from 'react'
import { Box, BoxProps, Center, Icon, Image, VStack } from '@chakra-ui/react'
import CrownSVG from '../../assets/crown.svg?react'

export interface RankingAvatarProps extends BoxProps {
  tag: ReactNode
  name: ReactNode
  size?: number
  src?: string
  isCrown?: boolean
}

export const RankingAvatar: FC<RankingAvatarProps> = ({
  size = 64,
  name,
  tag,
  src,
  isCrown,
  ...props
}) => {
  return (
    <Center
      pos="relative"
      style={{ width: `${size}px`, height: `${size}px` }}
      rounded="100%"
      bg="linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))"
      {...props}
    >
      {isCrown ? (
        <Icon
          as={CrownSVG}
          pos="absolute"
          top="-6px"
          right="-12px"
          w={9}
          h={9}
        />
      ) : null}
      <Image
        src={
          src ||
          new URL('../../assets/default-avatar.svg', import.meta.url).href
        }
        alt={src}
        w="calc(100% - 4px)"
        h="calc(100% - 4px)"
        rounded="100%"
        draggable={false}
        userSelect="none"
      />
      <VStack
        pos="absolute"
        top="80%"
        left="50%"
        transform="translateX(-50%)"
        spacing={1}
      >
        <Box
          py="6px"
          px="10px"
          bg="gradient.purple"
          rounded="100px"
          whiteSpace="nowrap"
          fontSize="14px"
          lineHeight="16px"
          fontWeight={700}
          color="neutrals.9"
        >
          {tag}
        </Box>
        <Box
          fontSize="12px"
          fontWeight={400}
          lineHeight="150%"
          color="neutrals.1"
        >
          {name}
        </Box>
      </VStack>
    </Center>
  )
}
