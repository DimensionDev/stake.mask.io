import {
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalContentProps,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
} from '@chakra-ui/react'

import { t } from '@lingui/macro'
import { ReactNode } from 'react'
import Close from '../assets/close.svg?react'

interface Props extends ModalProps {
  title: ReactNode
  width: ModalContentProps['width']
  height: ModalContentProps['height']
}
export function BaseModal({ title, width, height, ...rest }: Props) {
  return (
    <Modal isCentered {...rest}>
      <ModalOverlay />
      <ModalContent
        bg="neutrals.8"
        rounded={20}
        width={width}
        height={height}
        maxW="auto"
        maxH="auto"
      >
        <ModalHeader display="flex" flexDir="row" padding="24px 24px 0 24px">
          <Text fontSize="32px">{title}</Text>
          <IconButton
            rounded="50%"
            border="1px solid "
            borderColor="neutrals.6"
            bg="transparent"
            aria-label={t`Close`}
            ml="auto"
            icon={<Close />}
            onClick={rest.onClose}
          />
        </ModalHeader>
        <ModalBody p={6} display="flex" flexDir="column">
          {rest.children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
