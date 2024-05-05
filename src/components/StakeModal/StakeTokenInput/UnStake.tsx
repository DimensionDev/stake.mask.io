import { useState } from 'react';

import { InputPanel } from '@/components/StakeModal/StakeTokenInput/InputPanel.js';

export function UnStake() {
    const [amount, setAmount] = useState('');
    return (
        <>
            <InputPanel amount={amount} setAmount={setAmount} />
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
            <button
                style={{ background: 'var(--line-purple)' }}
                disabled={!amount}
                className={`flex w-full items-center justify-center rounded-[90px] py-[16px] text-[16px] text-neutrals8 ${amount ? '' : 'opacity-50'}`}
            >
                {amount ? 'Enter Amount' : 'Unstake'}
            </button>
        </>
    );
}
