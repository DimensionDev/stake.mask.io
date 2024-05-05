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
                <div className="w-[166px] bg-[white/0.03] h-16 px-3 py-1.5  rounded-[999px] justify-start items-center gap-[18px] inline-flex">
                    <div className="justify-end items-center flex">
                        <MaskIconNetwork width={48} height={48} />
                    </div>
                    <div className="flex-col justify-center items-start inline-flex">
                        <div className="text-neutral-50 text-xl font-bold font-['Inter'] leading-7">MASK</div>
                        <div className="text-gray-200 text-base font-bold font-['Inter'] leading-normal">Ethereum</div>
                    </div>
                </div>
                <InputBase
                    placeholder="0"
                    className="w-full !text-neutrals2 !text-[40px] !font-bold"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                />
                <div className='flex flex-col gap-[18px] items-end'>
                    <div className='text-neutrals4 text-[14px] w-[200px] text-end'>Balance: {balance ? balance : '--'}</div>
                    <button
                        className="rounded-[8px] px-[8px] py-[6px] text-[14px] text-neutrals8 font-bold w-[48px]"
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
