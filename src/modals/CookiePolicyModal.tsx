import { ModalWithDrawer } from '../components/ModalWithDrawer'
import { ModalBody, ModalCloseButton, ModalHeader } from '@chakra-ui/react'
import { t } from '@lingui/macro'

const CookiePolicyContent = () => (
  <>
    <p>{t`This website (hereinafter referred to as "the Site") uses cookies. By using the Site, you consent to the use of cookies as described in this Cookie Policy.`}</p>
    <p>
      {t`What Are Cookies?`}
      <br />
      {t`Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are used to store information about you and your internet usage habits to improve your online experience. Cookies enable websites to recognize your device and remember some information about your preferences.`}
    </p>
    <p>
      {t`Types of Cookies We Use`}
      <ul>
        <li>{t`Session Cookies: These cookies exist only during your visit to the website and are automatically deleted when you close your browser. They are used to maintain session state, such as storing the contents of your shopping cart.`}</li>
        <li>{t`Persistent Cookies: These cookies are stored on your device until they reach their expiration date or are manually deleted. They are used to remember your preferences and provide a personalized experience when you revisit the website.`}</li>
        <li>{t`Third-Party Cookies: The Site may use cookies from third-party service providers for traffic analysis and user behavior tracking, as well as to display ads relevant to your interests.`}</li>
      </ul>
    </p>
    <p>
      {t`How to Control Cookies`}
      <br />
      {t`You can manage and delete cookies through your browser settings. Please note that disabling cookies may affect your access to and experience on the Site.`}
      {t`Updates to the Cookie Policy`}
      {t`We reserve the right to update this Cookie Policy at any time. The updated Cookie Policy will be posted on this page and will become effective immediately. We recommend checking back regularly for updates.`}
    </p>
    <p>
      {t`Contact Us`}
      <br />
      {t`If you have any questions or concerns about this Cookie Policy, please contact us at:`}
      <br />
      {t`info@dimension.im`}
      <br />
      {t`Last Updated: 03.10 2024`}
    </p>
  </>
)

export function CookiePolicyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <ModalWithDrawer isOpen={isOpen} onClose={onClose}>
      <ModalCloseButton />
      <ModalHeader>{t`Cookie Policy`}</ModalHeader>
      <ModalBody
        color="neutrals.2"
        fontSize="12px"
        fontWeight={700}
        lineHeight="20px"
        sx={{
          p: {
            mb: 6,
          },
          ul: {
            pl: 6,
          },
        }}
      >
        <CookiePolicyContent />
      </ModalBody>
    </ModalWithDrawer>
  )
}
