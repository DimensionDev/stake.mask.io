import {
  Drawer,
  DrawerContent,
  type DrawerContentProps,
  DrawerOverlay,
  type DrawerProps,
  Modal,
  ModalContent,
  type ModalContentProps,
  ModalOverlay,
  type ModalProps,
  useBreakpointValue,
} from '@chakra-ui/react'
import type { ComponentType, PropsWithChildren } from 'react'

export interface ModalWithDrawerProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  modalProps?: Omit<ModalProps, 'isOpen' | 'onClose'>
  modalContentProps?: ModalContentProps
  drawerProps?: Omit<DrawerProps, 'isOpen' | 'onClose'>
  drawerContentProps?: DrawerContentProps
}

export const ModalWithDrawer: ComponentType<ModalWithDrawerProps> = ({
  isOpen,
  onClose,
  modalProps,
  drawerProps,
  modalContentProps,
  drawerContentProps,
  children,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} placement="bottom" {...drawerProps}>
        <DrawerOverlay />
        <DrawerContent maxH="calc(100% - 40px)" {...drawerContentProps}>
          {children}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered {...modalProps}>
      <ModalOverlay />
      <ModalContent maxWidth="572px" {...modalContentProps}>
        {children}
      </ModalContent>
    </Modal>
  )
}
