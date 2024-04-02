import { SelectLockTime } from './SelectLockTime.js';
import { useState } from 'react';
import { InputPanel } from './InputPanel.js';
import { Switch } from '@headlessui/react';

export function Stake() {
    const [lockTime, setLockTime] = useState(0);
    const [showX, setShowX] = useState(true);
    return (
        <>
            <InputPanel />
            <SelectLockTime setLockTime={setLockTime} lockTime={lockTime} />
            <div className="flex items-center justify-between text-[16px] text-neutrals4">
                <div>Pending Rewards</div>
                <div>200.0000 SLN</div>
            </div>
            <div className="flex items-center justify-between text-[16px] text-neutrals4">
                <div>Share of Pool</div>
                <div>30.99%</div>
            </div>
            <div className="flex items-center justify-between text-[16px] text-neutrals4">
                <div>APY</div>
                <div>3.84%</div>
            </div>
            <div className="flex items-center justify-between text-[16px] text-neutrals4">
                <div>Staked</div>
                <div>200.0000 SLN</div>
            </div>
            <div className="flex items-center justify-between text-[16px] text-neutrals4 ">
                <div>Display X accounts in the staking leaderboard</div>
                <Switch checked={showX} onChange={setShowX}>
                    {({ checked }) => (
                        <button
                            className={`${
                                checked ? 'bg-primary4' : 'bg-neutrals4'
                            } relative inline-flex w-[64px] items-center rounded-[32px] p-[4px]`}
                        >
                            <span className="sr-only">Enable signless</span>
                            <span
                                className={`${
                                    checked ? 'translate-x-8' : 'translate-x-0'
                                } inline-block h-[24px] w-[24px] transform rounded-full bg-neutrals8 transition`}
                            />
                        </button>
                    )}
                </Switch>
            </div>
            <div className="text-[16px] text-primary3">
                MASK Staking is exclusively open to individual users (excluding users listed in the blacklist).
                Organizations, companies, or institutions are not allowed to participate. More
            </div>
            <button
                style={{ background: 'var(--line-green)' }}
                className="flex w-full items-center justify-center rounded-[90px] py-[16px] text-[16px] text-neutrals8"
            >
                Enter Amount
            </button>
        </>
    );
}
