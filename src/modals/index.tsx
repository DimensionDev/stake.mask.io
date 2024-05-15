import { memo } from 'react'
import { StakeModal } from './StakeModal'
import { createUITaskManager } from './UITaskManager'

export const { ui: stakeModalUi, controller: stakeModal } =
  createUITaskManager(StakeModal)

export const Modals = memo(function Modals() {
  return <>{stakeModalUi}</>
})
