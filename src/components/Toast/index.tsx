import { Box, Center, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import type { ComponentType, ReactNode } from 'react'

import ErrorIcon from '@/assets/toast/error.svg?react'
import LoadingIcon from '@/assets/toast/loading.svg?react'
import SuccessIcon from '@/assets/toast/success.svg?react'

export interface ToastProps {
  status: 'error' | 'success' | 'loading'
  title: ReactNode
  description: ReactNode
}

export const Toast: ComponentType<ToastProps> = ({ status, title, description }) => {
  return (
    <HStack spacing={4} bg="neutrals.8" rounded="16px" p={4}>
      <Icon as={{ error: ErrorIcon, success: SuccessIcon, loading: LoadingIcon }[status]} boxSize={8} />
      <VStack align="start" spacing={0} w={{ base: 'unset' }} minW="200px">
        <Heading as="h6" color="neutrals.1" fontSize="16px" fontWeight={700} lineHeight="24px">
          {title}
        </Heading>
        <Text
          as="div"
          fontSize="14px"
          fontWeight={700}
          lineHeight="22px"
          whiteSpace="wrap"
          w="100%"
          overflow="auto"
          maxH="120px"
          style={{ scrollbarWidth: 'none' }}
          color={{ loading: 'neutrals.3', error: 'primary.3', success: 'primary.4' }[status]}
        >
          {description}
        </Text>
      </VStack>
      <Center w="12px">
        <Box
          bg={{ error: 'primary.3', loading: 'gradient.purple', success: 'gradient.purple' }[status]}
          w="12px"
          h="12px"
          rounded="100%"
        />
      </Center>
    </HStack>
  )
}
