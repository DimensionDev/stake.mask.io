import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalContentProps,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  useBreakpointValue,
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
  const isMobile = useBreakpointValue({ base: true, md: false })
  const header = (
    <>
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
    </>
  )
  if (isMobile) {
    return (
      <Drawer {...rest} placement="bottom">
        <DrawerOverlay />
        <DrawerContent bg="neutrals.8" rounded={20}>
          <DrawerContent maxH="calc(100vh - 40px)" p={0} display="flex" flexDir="column">
            <DrawerHeader display="flex" flexDir="row" padding="16px 16px 0 16px">
              {header}
            </DrawerHeader>
            <DrawerBody p={6} display="flex" flexDir="column">
              {rest.children}
            </DrawerBody>
          </DrawerContent>
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Modal isCentered {...rest}>
      <ModalOverlay />
      <ModalContent bg="neutrals.8" rounded={20} width={width} height={height} maxW="auto" maxH="auto">
        <ModalHeader display="flex" flexDir="row" padding="16px 16px 0 16px">
          {header}
        </ModalHeader>
        <ModalBody p={6} display="flex" flexDir="column">
          {rest.children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
