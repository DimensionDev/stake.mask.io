'use client';

import { useAccount, useDisconnect } from 'wagmi';

export function WalletInfo() {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    return (
        <div className="flex w-full flex-col items-center gap-[8px] rounded-[20px] bg-neutrals8 p-[12px]">
            <div className="flex w-full items-center justify-between" />
            <button className="flex w-[296px] items-center justify-center gap-[8px] rounded-[8px] p-[8px] text-center font-bold text-neutrals1 hover:bg-neutrals9">
                Edit
            </button>
            <button
                className="flex w-[296px] items-center justify-center gap-[8px] rounded-[8px] p-[8px] text-center font-bold text-neutrals1 hover:bg-neutrals9"
                onClick={() => {
                    disconnect();
                }}
            >
                Log out
            </button>
        </div>
    );
}
