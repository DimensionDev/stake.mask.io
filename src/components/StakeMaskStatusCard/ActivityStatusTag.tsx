import type { FC } from 'react'
import { Box, type BoxProps } from '@chakra-ui/react'

export const ActivityStatusTag: FC<BoxProps> = ({ ...props }) => {
  return (
    <Box
      bg="neutrals.9"
      color="neutrals.1"
      rounded="6px"
      fontSize="12px"
      fontWeight={600}
      lineHeight="20px"
      px="6px"
      {...props}
    >
      Not started
    </Box>
  )
}
