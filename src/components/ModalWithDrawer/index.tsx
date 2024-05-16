import type { FC, PropsWithChildren } from 'react'
import {
  Modal,
  useBreakpointValue,
  ModalOverlay,
  ModalContent,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  type ModalProps,
  type DrawerProps,
  type ModalContentProps,
  type DrawerContentProps,
} from '@chakra-ui/react'

export interface ModalWithDrawerProps extends PropsWithChildren {
  isOpen: boolean
  onClose: () => void
  modalProps?: Omit<ModalProps, 'isOpen' | 'onClose'>
  modalContentProps?: ModalContentProps
  drawerProps?: Omit<DrawerProps, 'isOpen' | 'onClose'>
  drawerContentProps?: DrawerContentProps
}

export const ModalWithDrawer: FC<ModalWithDrawerProps> = ({
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
