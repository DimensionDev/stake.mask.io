"use client"

import ETHIcon from "@/assets/logos/eth.svg"
import { useState } from "react"
import { SwitchTab } from "./SwitchTab.js"
import { InputPanel } from "./InputPanel.js"
import { SelectLockTime } from "./SelectLockTime.js"

export function StakeTokenInput() {
  const [tabValue, setTabValue] = useState(0)
  const [lockTime, setLockTime] = useState(0)
  return <div className="border-[1px] p-[16px] rounded-[16px] border-neutrals6 flex flex-col w-full gap-[12px]" >
    <div className="flex justify-between items-center">
      <div className="text-neutrals2 text-[24px]">Farm Mask</div>
      <div className="flex gap-[8px] py-[6px] px-[8px] rounded-[8px] bg-blueBg justify-center items-center text-neutrals8 text-[14px]">
        <ETHIcon width={16} height={16} /> ETH
      </div>
    </div>
    <SwitchTab setTabValue={setTabValue} value={tabValue} />
    <InputPanel />
    <SelectLockTime setLockTime={setLockTime} lockTime={lockTime} />
    <div className="flex justify-between text-neutrals4 text-[16px] ">
      <div>Pending Rewards</div>
      <div>200.0000 SLN</div>
    </div>
    <div className="flex justify-between text-neutrals4 text-[16px] ">
      <div>Share of Pool</div>
      <div>30.99%</div>
    </div>
    <div className="flex justify-between text-neutrals4 text-[16px] ">
      <div>APY</div>
      <div>3.84%</div>
    </div>
    <div className="flex justify-between text-neutrals4 text-[16px] ">
      <div>Staked</div>
      <div>200.0000 SLN</div>
    </div>
  </div>
}
