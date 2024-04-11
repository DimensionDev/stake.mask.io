'use client';

import { useAccount } from 'wagmi';

import Close from '@/assets/close.svg';
import Metamask from '@/assets/logos/metamask.svg';
import { MainButton } from '@/components/MainButton.js';
import { formatAddress } from '@/helpers/formatAddress.js';

export function WalletInfo() {
    const { address } = useAccount();
    return (
        <div className="flex w-full flex-col items-center gap-[24px]">
            <div className="flex w-full items-center justify-between">
                <div className="text-[32px] text-neutrals2">Profile</div>
                <div className="flex items-center justify-center border-[2px] border-neutrals6 bg-neutrals9">
                    <Close width={24} height={24} />
                </div>
            </div>
            <div className="flex w-full items-center gap-[8px] rounded-[8px] bg-neutrals7 p-[8px]">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-neutrals8">
                    <Metamask width={30} height={30} />
                </div>
                <div className="flex flex-1 items-center">{address ? formatAddress(address) : null}</div>
                <MainButton onClick={() => {}}>Change</MainButton>
            </div>
        </div>
    );
}
