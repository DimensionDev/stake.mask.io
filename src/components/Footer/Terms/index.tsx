import { FC } from 'react'
import { HStack, Link, ModalBody, ModalCloseButton, ModalHeader, useDisclosure } from '@chakra-ui/react'
import { ModalWithDrawer } from '../../ModalWithDrawer'
import { t } from '@lingui/macro'
import { cookiePolicyModal } from '../../../modals'

const TermsOfUseContent = () => (
  <>
    <p style={{ whiteSpace: 'pre-wrap' }}>
      {t`Terms of Use for Mask.io
Acceptance of Terms
By accessing and using Mask.io , you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, you may not use our services.
Changes to Terms
We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of our services after any changes indicates your acceptance of the new Terms.
Use of Our Services
[Your Website Name] allows you to stake Mask to receive other token rewards. You agree to use our services only for lawful purposes and in accordance with these Terms.
Account Responsibilities
You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
You agree to notify us immediately of any unauthorized use of your account.
Prohibited Activities
You agree not to engage in any of the following prohibited activities:
Using our services for any illegal purpose or in violation of any local, state, national, or international law.
Infringing on the intellectual property rights of others or the intellectual property rights of Mask.io.
Attempting to gain unauthorized access to our services or another user's account.
Interfering with the security-related features of our services.
Intellectual Property
All content, trademarks, logos, and service marks displayed on Mask.io are our property or the property of other third parties. You are not permitted to use these Marks without our prior written consent or the consent of such third party which may own the Marks.
Disclaimer of Warranties
Our services are provided on an "as is" and "as available" basis. Mask.io expressly disclaims all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
Limitation of Liability
[Your Website Name] shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses, resulting from the use or the inability to use our services.
Indemnification
You agree to indemnify and hold harmless Mask.io and its officers, directors, employees, and agents from any and all claims, damages, expenses, and liabilities arising out of your use of our services, your violation of these Terms, or your violation of the rights of a third party.
Governing Law
These Terms shall be governed and construed in accordance with the laws of the People's Republic of China, without regard to its conflict of law provisions.
Contact Us
If you have any questions about these Terms, please contact us at info@dimension.im.`}
    </p>
  </>
)

const PrivacyPolicyContent = () => (
  <>
    <p style={{ whiteSpace: 'pre-wrap' }}>{t`Introduction
Mask Network is committed to protecting the privacy of its users. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you stake Mask to receive other token rewards through our website. By using our service, you consent to the data practices described in this policy.

Information Collection and Use
Information You Provide to Us

We collect information you provide directly to us when you use our services. This may include:
Contact information, such as your name, email address, and phone number.
Blockchain-related information, such as your wallet addresses.
Social media account information, including but not limited to accounts on platforms like x.com.
When you choose to link your social media accounts or provide your wallet addresses, we may display this information on our website to enhance the user experience and foster a community environment. We encourage you to review the privacy settings and policies of any social media platforms you interact with to understand how your information may be shared and used.

Information We Collect Automatically
When you access our website, we may automatically collect information about your device and usage, including:
IP address, browser type, and operating system.
Information about your interactions with our website, such as the pages you visit.

Use of Your Information
We use the information we collect about you to:
Provide, maintain, and improve our services.
Display your social media profiles and wallet addresses on our website, subject to your preferences and permissions.
Respond to your inquiries and provide customer support.
Monitor and analyze trends, usage, and activities in connection with our services.

Sharing of Your Information
We may share your information with third parties in the following situations:
With your consent or at your direction.
With service providers who assist us in our operations, under confidentiality agreements.
If required by law or to protect the rights, property, or safety of [Your Website Name], our users, or others.

Security
We take reasonable measures to protect your information from unauthorized access, use, alteration, and destruction. However, no internet or email transmission is ever fully secure or error-free.
Changes to This Privacy Policy
We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
Contact Us
If you have any questions about this Privacy Policy, please contact us at info@dimension.im.

    `}</p>
  </>
)

export const Terms: FC = () => {
  const termsOfUse = useDisclosure()
  const privacyPolicy = useDisclosure()
  return (
    <>
      <ModalWithDrawer isOpen={termsOfUse.isOpen} onClose={termsOfUse.onClose}>
        <ModalCloseButton />
        <ModalHeader>{t`Terms of Use`}</ModalHeader>
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
          <TermsOfUseContent />
        </ModalBody>
      </ModalWithDrawer>
      <ModalWithDrawer isOpen={privacyPolicy.isOpen} onClose={privacyPolicy.onClose}>
        <ModalCloseButton />
        <ModalHeader>{t`Privacy Policy`}</ModalHeader>
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
          <PrivacyPolicyContent />
        </ModalBody>
      </ModalWithDrawer>
      <HStack spacing={4} color="neutrals.4" fontSize="12px" fontWeight={700} lineHeight="20px">
        <Link cursor="pointer" onClick={termsOfUse.onOpen}>
          Terms of Use
        </Link>
        <Link cursor="pointer" onClick={privacyPolicy.onOpen}>
          Privacy Policy
        </Link>
        <Link cursor="pointer" onClick={() => cookiePolicyModal.show()}>
          Cookie Policy
        </Link>
      </HStack>
    </>
  )
}
