import { memo } from 'react'
import { cookiePolicyUi } from './CookiePolicyModal.tsx'
import { profileModalUi } from './ProfileModal'
import { resultModalUi } from './ResultModal.tsx'
import { stakeModalUi } from './StakeModal'
import { verifyModalUi } from './VerifyModal.tsx'

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
