import { HStack, Link } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { ComponentType } from 'react'

import cookiePolicyContent from '@/assets/cookie-policy.md'
import privacyPolicyContent from '@/assets/privacy_policy.md'
import termsContent from '@/assets/terms_of_use.md'
import { articleModal } from '@/modals/ArticleModal'

export const Terms: ComponentType = () => {
  return (
    <>
      <HStack spacing={4} color="neutrals.4" fontSize="12px" fontWeight={700} lineHeight="20px">
        <Link
          cursor="pointer"
          onClick={() => {
            articleModal.show({
              title: t`Terms of Use`,
              content: termsContent,
            })
          }}
        >
          {t`Terms of Use`}
        </Link>
        <Link
          cursor="pointer"
          onClick={() => {
            articleModal.show({
              title: t`Privacy Policy`,
              content: privacyPolicyContent,
            })
          }}
        >
          {t`Privacy Policy`}
        </Link>
        <Link
          cursor="pointer"
          onClick={() => {
            articleModal.show({
              title: t`Cookie Policy`,
              content: cookiePolicyContent,
            })
          }}
        >
          {t`Cookie Policy`}
        </Link>
      </HStack>
    </>
  )
}
