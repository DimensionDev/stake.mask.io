import { SelectLockTime } from './SelectLockTime.js';
import { useState } from 'react';
import { InputPanel } from './InputPanel.js';
import { Switch } from '@headlessui/react';

export function Stake() {
  const [lockTime, setLockTime] = useState(0)
  const [amount, setAmount] = useState('')
  const [showX, setShowX] = useState(true)
  return <>
    <InputPanel amount={amount} setAmount={setAmount} />
    <SelectLockTime setLockTime={setLockTime} lockTime={lockTime} />
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
    <div className="flex justify-between text-neutrals4 text-[16px] items-center ">
      <div>Display X accounts in the staking leaderboard</div>
      <Switch checked={showX} onChange={setShowX}>
        {({ checked }) => (
          <button
            className={`${checked ? 'bg-primary4' : 'bg-neutrals4'
              } relative inline-flex p-[4px] w-[64px] items-center rounded-[32px]`}
          >
            <span
              className={`${checked ? 'translate-x-8' : 'translate-x-0'
                } inline-block h-[24px] w-[24px] transform rounded-full bg-neutrals8 transition`}
            />
          </button>
        )}
      </Switch>
    </div>
    <div className="text-primary3 text-[16px]">
      MASK Staking is exclusively open to individual users (excluding users listed in the blacklist). Organizations, companies, or institutions are not allowed to participate. More
    </div>
    <button style={{ background: "var(--line-green)" }} disabled={!amount} className={`rounded-[90px] py-[16px] flex items-center justify-center text-neutrals8 w-full text-[16px] ${amount ? "" : "opacity-50"}`}>{amount ? "Enter Amount" : "Stake"}</button>
  </>
}
