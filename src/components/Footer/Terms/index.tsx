import { HStack, Link, ModalBody, ModalCloseButton, ModalHeader, useDisclosure } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import Markdown from 'markdown-to-jsx'
import { ComponentType } from 'react'

import cookiePolicyContent from '@/assets/cookie-policy.md'
import privacyPolicyContent from '@/assets/privacy_policy.md'
import termsContent from '@/assets/terms_of_use.md'
import { ModalWithDrawer } from '@/components/ModalWithDrawer'
import { cookiePolicyModal } from '@/modals/CookiePolicyModal'
import { markdownBaseStyle } from '@/styles/markdown-base-style.svg.ts'

export const Terms: ComponentType = () => {
  const cookiePolicy = useDisclosure()
  const termsOfUse = useDisclosure()
  const privacyPolicy = useDisclosure()
  return (
    <>
      <ModalWithDrawer isOpen={cookiePolicy.isOpen} onClose={cookiePolicy.onClose}>
        <ModalCloseButton />
        <ModalHeader>{t`Cookie Policy`}</ModalHeader>
        <ModalBody color="neutrals.2" fontSize="12px" fontWeight={700} lineHeight="20px" sx={markdownBaseStyle}>
          <Markdown children={cookiePolicyContent} />
        </ModalBody>
      </ModalWithDrawer>
      <ModalWithDrawer isOpen={termsOfUse.isOpen} onClose={termsOfUse.onClose}>
        <ModalCloseButton />
        <ModalHeader>{t`Terms of Use`}</ModalHeader>
        <ModalBody color="neutrals.2" fontSize="12px" fontWeight={700} lineHeight="20px" sx={markdownBaseStyle}>
          <Markdown children={termsContent} />
        </ModalBody>
      </ModalWithDrawer>
      <ModalWithDrawer isOpen={privacyPolicy.isOpen} onClose={privacyPolicy.onClose}>
        <ModalCloseButton />
        <ModalHeader>{t`Privacy Policy`}</ModalHeader>
        <ModalBody color="neutrals.2" fontSize="12px" fontWeight={700} lineHeight="20px" sx={markdownBaseStyle}>
          <Markdown children={privacyPolicyContent} />
        </ModalBody>
      </ModalWithDrawer>
      <HStack spacing={4} color="neutrals.4" fontSize="12px" fontWeight={700} lineHeight="20px">
        <Link cursor="pointer" onClick={termsOfUse.onOpen}>
          {t`Terms of Use`}
        </Link>
        <Link cursor="pointer" onClick={privacyPolicy.onOpen}>
          {t`Privacy Policy`}
        </Link>
        <Link cursor="pointer" onClick={() => cookiePolicyModal.show()}>
          {t`Cookie Policy`}
        </Link>
      </HStack>
    </>
  )
}
