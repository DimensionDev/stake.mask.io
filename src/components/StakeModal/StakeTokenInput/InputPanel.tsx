import { InputBase } from '@mui/material';

import MaskIconNetwork from '@/assets/logos/mask-network.svg';

interface InputPanelProps {
    amount: string;
    setAmount: (amount: string) => void;
    balance?: string;
}

export function InputPanel({ amount, setAmount, balance }: InputPanelProps) {
    return (
        <div className="flex flex-col gap-[18px] rounded-[12px] border-[2px] border-neutrals6 p-[8px]">
            <div className="flex items-center gap-[18px]">
                <div className="inline-flex h-16 w-[166px] items-center justify-start  gap-[18px] rounded-[999px] bg-[white/0.03] px-3 py-1.5">
                    <div className="flex items-center justify-end">
                        <MaskIconNetwork width={48} height={48} />
                    </div>
                    <div className="inline-flex flex-col items-start justify-center">
                        <div className="font-['Inter'] text-xl font-bold leading-7 text-neutral-50">MASK</div>
                        <div className="font-['Inter'] text-base font-bold leading-normal text-gray-200">Ethereum</div>
                    </div>
                </div>
                <InputBase
                    placeholder="0"
                    type="number"
                    className="w-full !text-[40px] !font-bold !text-neutrals2"
                    onChange={(e) => {
                        setAmount(e.target.value);
                    }}
                    value={amount}
                />
                <div className="flex flex-col items-end gap-[18px]">
                    <div className="w-[200px] text-end text-[14px] text-neutrals4">
                        Balance: {balance ? balance : '--'}
                    </div>
                    <button
                        className="w-[48px] rounded-[8px] px-[8px] py-[6px] text-[14px] font-bold text-neutrals8"
                        style={{ background: 'var(--line-purple)' }}
                        onClick={() => setAmount(balance || '0')}
                    >
                        MAX
                    </button>
                </div>
            </div>
        </div>
    );
}
