'use client';

import { useState } from 'react';

import { Stake } from '@/components/StakeModal/StakeTokenInput/Stake.js';
import CloseIcon from '@/assets/close.svg';
import { ConnectWalletButton } from '@/components/Header/ConnectWalletButton.js';
import { ConnectXButton } from '@/components/Header/ConnectXButton.js';
import { useAccount } from 'wagmi';
import CheckBox from '@/assets/checkButton.svg';
import { useSession } from 'next-auth/react';

interface StakeTokenInputProps {
    onClose: () => void;
}

export function StakeTokenInput({ onClose }: StakeTokenInputProps) {
    const [tabValue, setTabValue] = useState(0);
    const { address } = useAccount()
    const { status } = useSession();
    return (
        <div className="flex w-full flex-col gap-[12px] z-50">
            <div className="flex items-center justify-between">
                <div className="text-[24px] text-neutrals2">Stake</div>
                <div className="flex items-center justify-center gap-[8px] rounded-full border-[2px] w-[24px] h-[24px] border-neutrals6 text-neutrals8 cursor-pointer" onClick={() => { onClose() }}>
                    <CloseIcon width={16} height={16} />
                </div>
            </div>
            <div className='flex items-center justify-between gap-[12px]'>

                <div className='flex items-center gap-[12px]'>
                    {address ? <CheckBox width={24} height={24} /> :
                        <div className="w-6 h-6 bg-white rounded flex-col justify-start items-center gap-2.5 inline-flex ">
                            <div className="text-black text-sm font-bold text-center leading-[22px]">1</div>
                        </div>}
                    <div className='text-sm text-neutrals1 font-bold'>Connect Wallet</div>
                </div>
                {address ? null :
                    <ConnectWalletButton small />}
            </div>
            <div className='flex items-center justify-between gap-[12px]'>
                <div className='flex items-center gap-[12px]'>
                    {
                        status === 'authenticated' ? <CheckBox width={24} height={24} /> :
                            <div className="w-6 h-6 bg-white rounded flex-col justify-start items-center gap-2.5 inline-flex ">
                                <div className="text-black text-sm font-bold text-center leading-[22px]">2</div>
                            </div>
                    }
                    <div className='text-sm text-neutrals1 font-bold'>Link X</div>
                </div>
                {
                    status != 'authenticated' ? <ConnectXButton /> : null
                }
            </div>
            <Stake />
        </div>
    );
}
