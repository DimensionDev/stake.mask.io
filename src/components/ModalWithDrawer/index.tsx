import type { FC, PropsWithChildren } from 'react'
import {
  Modal,
  useBreakpointValue,
  ModalOverlay,
  ModalContent,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react'

export interface ModalWithDrawerProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
}

export const ModalWithDrawer: FC<ModalWithDrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
        <DrawerOverlay />
        <DrawerContent maxH="calc(100% - 40px)">{children}</DrawerContent>
      </Drawer>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>{children}</ModalContent>
    </Modal>
  )
}
