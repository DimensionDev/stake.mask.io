import { Button, Image, ModalProps, Text, VStack } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { ReactNode } from 'react'
import { BaseModal, BaseModalProps } from './BaseModal'
import { createUITaskManager } from './UITaskManager'

interface Props extends ModalProps {
  title?: BaseModalProps['title']
  message?: ReactNode
  description?: ReactNode
}
export function ResultModal({ title, message, description, ...props }: Props) {
  return (
    <BaseModal title={title} height={552} width={572} {...props}>
      <VStack alignItems="center">
        <Image src={new URL('../assets/astronaut.svg', import.meta.url).href} w={245} h={251} />
        <Text color="neutrals.3" fontSize={32} lineHeight="40px" mt={8}>
          {message}
        </Text>
        <Text color="neutrals.3" fontSize={16} mt={8}>
          {description}
        </Text>
        <Button className="purple-gradient-button" w="100%" rounded="40px" onClick={props.onClose}>{t`Done`}</Button>
      </VStack>
    </BaseModal>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const { ui: resultModalUi, controller: resultModal } = createUITaskManager(ResultModal)
