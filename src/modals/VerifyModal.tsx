import { Button, ModalProps, Text, VStack } from '@chakra-ui/react'
import { t } from '@lingui/macro'

import { BaseModal } from '@/modals/BaseModal'
import { createUITaskManager } from '@/modals/UITaskManager'

interface Props extends ModalProps {
  onSign?(): void
}
export function VerifyModal({ onSign, ...props }: Props) {
  return (
    <BaseModal title={t`Verify your account`} width={448} height={348} {...props}>
      <VStack alignItems="center" h="100%" gap="12px">
        <Text color="neutrals.3" fontSize={16} lineHeight="24px" mt={8}>
          {t`To finish connecting, you must sign a message in your wallet to verify that you are the owner of this account.`}
        </Text>
        <Button
          className="purple-gradient-button"
          w="100%"
          size="lg"
          mt="auto"
          fontSize={16}
          rounded="40px"
          onClick={onSign}
        >{t`Sign`}</Button>
        <Button rounded={24} size="lg" fontSize={16} w="100%" onClick={props.onClose}>{t`Cancel`}</Button>
      </VStack>
    </BaseModal>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const { ui: verifyModalUi, controller: verifyModal } = createUITaskManager(VerifyModal)
