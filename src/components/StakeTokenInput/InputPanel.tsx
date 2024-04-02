import { InputBase } from '@mui/material';
import MaskIconNetwork from '@/assets/logos/mask-network.svg';

export function InputPanel() {
    return (
        <div className="flex flex-col gap-[18px] rounded-[12px] border-[2px] border-neutrals6 p-[8px]">
            <div className="flex justify-between text-[16px] text-neutrals4">
                <div>Amount</div>
                <div>Balance: </div>
            </div>
            <div className="flex items-center gap-[18px]">
                <MaskIconNetwork width={32} height={32} />
                <InputBase placeholder="0" className="w-full text-neutrals2" />
                <button
                    className="rounded-[8px] px-[8px] py-[6px] text-[14px] text-neutrals8"
                    style={{ background: 'var(--line-green)' }}
                >
                    MAX
                </button>
            </div>
            <div className="grid grid-cols-4 gap-[16px]">
                <button className="rounded-[90px] border-[2px] border-neutrals6 py-[12px] text-[14px] text-neutrals2">
                    25%
                </button>
                <button className="rounded-[90px] border-[2px] border-neutrals6 py-[12px] text-[14px] text-neutrals2">
                    50%
                </button>
                <button className="rounded-[90px] border-[2px] border-neutrals6 py-[12px] text-[14px] text-neutrals2">
                    75%
                </button>
                <button className="rounded-[90px] border-[2px] border-neutrals6 py-[12px] text-[14px] text-neutrals2">
                    100%
                </button>
            </div>
        </div>
    );
}
