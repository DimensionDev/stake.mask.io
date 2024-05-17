import { memo } from 'react'
import { CookiePolicyModal } from './CookiePolicyModal.tsx'
import { ProfileModal } from './ProfileModal'
import { StakeModal } from './StakeModal'
import { createUITaskManager } from './UITaskManager'

/* eslint-disable react-refresh/only-export-components */
export const { ui: stakeModalUi, controller: stakeModal } = createUITaskManager(StakeModal)
export const { ui: cookiePolicyUi, controller: cookiePolicyModal } = createUITaskManager(CookiePolicyModal)
export const { ui: profileModalUi, controller: profileModal } = createUITaskManager(ProfileModal)

export const Modals = memo(function Modals() {
  return (
    <>
      {stakeModalUi}
      {cookiePolicyUi}
      {profileModalUi}
    </>
  )
})
