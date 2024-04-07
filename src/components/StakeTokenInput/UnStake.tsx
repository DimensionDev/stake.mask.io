import { useState } from "react"
import { InputPanel } from "./InputPanel.js"

export function UnStake() {
  const [amount, setAmount] = useState('')
  return <>
    <InputPanel amount={amount} setAmount={setAmount} />
    <div className="flex justify-between text-neutrals4 text-[16px] items-center">
      <div>Pending Rewards</div>
      <div>200.0000 SLN</div>
    </div>
    <div className="flex justify-between text-neutrals4 text-[16px] items-center">
      <div>Share of Pool</div>
      <div>30.99%</div>
    </div>
    <div className="flex justify-between text-neutrals4 text-[16px] items-center">
      <div>APY</div>
      <div>3.84%</div>
    </div>
    <div className="flex justify-between text-neutrals4 text-[16px] items-center">
      <div>Staked</div>
      <div>200.0000 SLN</div>
    </div>

    <button style={{ background: "var(--line-green)" }} disabled={!amount} className={`rounded-[90px] py-[16px] flex items-center justify-center text-neutrals8 w-full text-[16px] ${amount ? "" : "opacity-50"}`}>{amount ? "Enter Amount" : "Unstake"}</button>
  </>
}
