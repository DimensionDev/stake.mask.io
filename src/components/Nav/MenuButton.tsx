import { Box, HTMLChakraProps, Icon } from '@chakra-ui/react'
import { ComponentType } from 'react'

import CloseSVG from '@/assets/close.svg?react'
import MoreSVG from '@/assets/more.svg?react'

export interface MenuButton extends HTMLChakraProps<'button'> {
  isOpen?: boolean
}

export const MenuButton: ComponentType<MenuButton> = ({ isOpen = false, ...props }) => {
  return (
    <Box as="button" color="neutrals.4" w="8" h="8" ml="auto" pos="relative" {...props}>
      <Icon
        as={CloseSVG}
        w="8"
        h="8"
        top="0"
        left="0"
        pos="absolute"
        transition="200ms"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? undefined : 'scale(0)',
        }}
      />
      <Icon
        as={MoreSVG}
        w="8"
        h="8"
        top="0"
        left="0"
        pos="absolute"
        transition="200ms"
        style={{
          opacity: isOpen ? 0 : 1,
          transform: !isOpen ? undefined : 'scale(0)',
        }}
      />
    </Box>
  )
}
