import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

import { ReactNode } from 'react'

interface Props extends ModalProps {
  title: ReactNode
  width: ModalContentProps['width']
  height: ModalContentProps['height']
}
export function BaseModal({ title, width, ...rest }: Props) {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const header = (
    <>
      <Text fontSize="32px">{title}</Text>
      <ModalCloseButton />
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
      <ModalContent bg="neutrals.8" rounded={20} width={width} maxW="auto" maxH="auto">
        <ModalHeader display="flex" flexDir="row" padding="24px 24px 0 24px">
          {header}
        </ModalHeader>
        <ModalBody p={6} display="flex" flexDir="column">
          {rest.children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
