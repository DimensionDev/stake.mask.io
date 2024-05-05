'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useAccount } from 'wagmi';

import CheckBox from '@/assets/checkButton.svg';
import CloseIcon from '@/assets/close.svg';
import { ConnectWalletButton } from '@/components/Header/ConnectWalletButton.js';
import { ConnectXButton } from '@/components/Header/ConnectXButton.js';
import { Stake } from '@/components/StakeModal/StakeTokenInput/Stake.js';

interface StakeTokenInputProps {
    onClose: () => void;
}

export function StakeTokenInput({ onClose }: StakeTokenInputProps) {
    const [tabValue, setTabValue] = useState(0);
    const { address } = useAccount();
    const { status } = useSession();
    return (
        <div className="z-50 flex w-full flex-col gap-[12px]">
            <div className="flex items-center justify-between">
                <div className="text-[24px] text-neutrals2">Stake</div>
                <div
                    className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center gap-[8px] rounded-full border-[2px] border-neutrals6 text-neutrals8"
                    onClick={() => {
                        onClose();
                    }}
                >
                    <CloseIcon width={16} height={16} />
                </div>
            </div>
            <div className="flex items-center justify-between gap-[12px]">
                <div className="flex items-center gap-[12px]">
                    {address ? (
                        <CheckBox width={24} height={24} />
                    ) : (
                        <div className="inline-flex h-6 w-6 flex-col items-center justify-start gap-2.5 rounded bg-white ">
                            <div className="text-center text-sm font-bold leading-[22px] text-black">1</div>
                        </div>
                    )}
                    <div className="text-sm font-bold text-neutrals1">Connect Wallet</div>
                </div>
                {address ? null : <ConnectWalletButton small />}
            </div>
            <div className="flex items-center justify-between gap-[12px]">
                <div className="flex items-center gap-[12px]">
                    {status === 'authenticated' ? (
                        <CheckBox width={24} height={24} />
                    ) : (
                        <div className="inline-flex h-6 w-6 flex-col items-center justify-start gap-2.5 rounded bg-white ">
                            <div className="text-center text-sm font-bold leading-[22px] text-black">2</div>
                        </div>
                    )}
                    <div className="text-sm font-bold text-neutrals1">Link X</div>
                </div>
                {
                    status !== 'authenticated' ? <ConnectXButton /> : null
                }
            </div>
            <Stake />
        </div>
    );
}
