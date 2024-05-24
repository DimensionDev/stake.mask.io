import { Box, BoxProps, Image, Text } from '@chakra-ui/react'

import CardGlowImage from '@/assets/card-glow.webp'

export interface ActionCardProps extends BoxProps {
  title: string
}

export function ActionCard({ title, ...props }: ActionCardProps) {
  return (
    <Box
      p={4}
      rounded="16px"
      transform="translate3d(0, 0, 0)"
      border="1px solid"
      borderColor="neutrals.6"
      shadow="0px 5px 10px 0px rgba(0, 0, 0, 0.10), 0px 15px 30px 0px rgba(0, 0, 0, 0.10), 0px 20px 40px 0px rgba(0, 0, 0, 0.15)"
      backdropFilter="blur(10px)"
      pos="relative"
      {...props}
    >
      <Image
        src={CardGlowImage}
        w="332px"
        minW="332px"
        h="196px"
        objectFit="contain"
        top="0"
        left="0"
        pos="absolute"
        transform="translateX(-28%) translateY(-28%) scale(1.3)"
        transformOrigin="left top"
        draggable={false}
        userSelect="none"
        pointerEvents="none"
      />
      <Text lineHeight="140%" fontSize="20px" fontWeight="bold">
        {title}
      </Text>
      {props.children}
    </Box>
  )
}
