import { memo } from 'react'
import { cookiePolicyUi } from './CookiePolicyModal.tsx'
import { profileModalUi } from './ProfileModal'
import { stakeModalUi } from './StakeModal'

export const Modals = memo(function Modals() {
  return (
    <>
      {stakeModalUi}
      {cookiePolicyUi}
      {profileModalUi}
    </>
  )
})
