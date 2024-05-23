import type { FC, ReactNode } from 'react'
import { Box, BoxProps, Center, Icon, Image, VStack } from '@chakra-ui/react'
import CrownSVG from '../../assets/crown.svg?react'
import { Tooltip } from '../Tooltip.tsx'

export interface RankingAvatarProps extends BoxProps {
  tag: ReactNode
  name: ReactNode
  highlight?: boolean
  src?: string
  isCrown?: boolean
}

export const RankingAvatar: FC<RankingAvatarProps> = ({ name, tag, src, isCrown, highlight, ...props }) => {
  return (
    <Center
      pos="relative"
      rounded="100%"
      bg="linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))"
      boxSize="64px"
      {...props}
    >
      {isCrown ? <Icon as={CrownSVG} pos="absolute" top="-6px" right="-12px" w={9} h={9} /> : null}
      <Image
        src={src || new URL('../../assets/default-avatar.svg', import.meta.url).href}
        alt={src}
        w="calc(100% - 4px)"
        h="calc(100% - 4px)"
        rounded="100%"
        draggable={false}
        userSelect="none"
      />
      <VStack pos="absolute" top="80%" left="50%" transform="translateX(-50%)" spacing={1}>
        <Box
          py="6px"
          px="10px"
          bg={highlight ? 'gradient.purple' : 'white'}
          rounded="100px"
          whiteSpace="nowrap"
          fontSize="14px"
          lineHeight="16px"
          fontWeight={700}
          color="neutrals.9"
        >
          {tag}
        </Box>
        <Tooltip label={name} placement="bottom">
          <Box fontSize="12px" fontWeight={400} lineHeight="150%" color="neutrals.1" maxW="100px" noOfLines={1}>
            {name}
          </Box>
        </Tooltip>
      </VStack>
    </Center>
  )
}
