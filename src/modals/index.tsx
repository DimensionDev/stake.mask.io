import { memo } from 'react'

import { cookiePolicyUi } from '@/modals/CookiePolicyModal.tsx'
import { profileModalUi } from '@/modals/ProfileModal'
import { resultModalUi } from '@/modals/ResultModal.tsx'
import { stakeModalUi } from '@/modals/StakeModal'
import { verifyModalUi } from '@/modals/VerifyModal.tsx'

export const Modals = memo(function Modals() {
  return (
    <>
      {stakeModalUi}
      {cookiePolicyUi}
      {profileModalUi}
      {resultModalUi}
      {verifyModalUi}
    </>
  )
})
