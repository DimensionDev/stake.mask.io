import { InputBase } from "@mui/material";
import MaskIconNetwork from "@/assets/logos/mask-network.svg";

interface InputPanelProps {
  amount: string,
  setAmount: (amount: string) => void
}

export function InputPanel({ amount, setAmount }: InputPanelProps) {
  return <div className="flex flex-col p-[8px] rounded-[12px] border-[2px] border-neutrals6 gap-[18px]">
    <div className="flex justify-between text-neutrals4 text-[16px]">
      <div>Amount</div>
      <div>Balance: </div>
    </div>
    <div className="flex gap-[18px] items-center">
      <MaskIconNetwork width={32} height={32} />
      <InputBase placeholder="0" className="!text-neutrals2 w-full" onChange={(e) => setAmount(e.target.value)} value={amount} />
      <button className="text-neutrals8 rounded-[8px] px-[8px] py-[6px] text-[14px]" style={{ background: 'var(--line-green)' }}>MAX</button>
    </div>
    <div className="grid grid-cols-4 gap-[16px]">
      <button className="rounded-[90px] border-[2px] border-neutrals6 text-[14px] py-[12px] text-neutrals2">25%</button>
      <button className="rounded-[90px] border-[2px] border-neutrals6 text-[14px] py-[12px] text-neutrals2">50%</button>
      <button className="rounded-[90px] border-[2px] border-neutrals6 text-[14px] py-[12px] text-neutrals2">75%</button>
      <button className="rounded-[90px] border-[2px] border-neutrals6 text-[14px] py-[12px] text-neutrals2">100%</button>
    </div>
  </div>
}
