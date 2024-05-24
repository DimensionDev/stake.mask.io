import { Button, Image, ModalProps, Text, VStack } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { ReactNode } from 'react'

import { BaseModal, BaseModalProps } from '@/modals/BaseModal'
import { createUITaskManager } from '@/modals/UITaskManager'

interface Props extends ModalProps {
  title?: BaseModalProps['title']
  message?: ReactNode
  description?: ReactNode
}
export function ResultModal({ title, message, description, ...props }: Props) {
  return (
    <BaseModal title={title} width={572} {...props}>
      <VStack alignItems="center" spacing={6}>
        <Image src={new URL('@/assets/astronaut.svg', import.meta.url).href} w={245} h={251} />
        <Text color="neutrals.3" fontSize={32} fontWeight={700} lineHeight="40px" textAlign="center">
          {message}
        </Text>
        <Text color="neutrals.3" fontSize={16} fontWeight={700} textAlign="center">
          {description}
        </Text>
        <Button
          className="purple-gradient-button"
          w="100%"
          mt="28px"
          rounded="40px"
          onClick={props.onClose}
        >{t`Done`}</Button>
      </VStack>
    </BaseModal>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const { ui: resultModalUi, controller: resultModal } = createUITaskManager(ResultModal)
