'use client';

import { useState } from 'react';

import ETHIcon from '@/assets/logos/eth.svg';
import { Stake } from '@/components/StakeTokenInput/Stake.js';
import { SwitchTab } from '@/components/StakeTokenInput/SwitchTab.js';
import { UnStake } from '@/components/StakeTokenInput/UnStake.js';

export function StakeTokenInput() {
    const [tabValue, setTabValue] = useState(0);
    return (
        <div className="flex w-full flex-col gap-[12px] rounded-[16px] border-[1px] border-neutrals6 p-[16px]">
            <div className="flex items-center justify-between">
                <div className="text-[24px] text-neutrals2">Farm Mask</div>
                <div className="flex items-center justify-center gap-[8px] rounded-[8px] bg-blueBg px-[8px] py-[6px] text-[14px] text-neutrals8">
                    <ETHIcon width={16} height={16} /> ETH
                </div>
            </div>
            <SwitchTab setTabValue={setTabValue} value={tabValue} />
            {tabValue ? <UnStake /> : <Stake />}
        </div>
    );
}
