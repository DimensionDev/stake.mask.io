import { memo } from 'react'
import { StakeModal } from './StakeModal'
import { createUITaskManager } from './UITaskManager'
import { CookiePolicyModal } from './CookiePolicyModal.tsx'

export const { ui: stakeModalUi, controller: stakeModal } = createUITaskManager(StakeModal)
export const { ui: cookiePolicyUi, controller: cookiePolicyModal } = createUITaskManager(CookiePolicyModal)

export const Modals = memo(function Modals() {
  return (
    <>
      {stakeModalUi} {cookiePolicyUi}
    </>
  )
})
