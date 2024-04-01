interface SwitchTabProps {
  setTabValue: (value: number) => void;
  value: number;
}
export function SwitchTab({ setTabValue, value }: SwitchTabProps) {
  return (
    <div className="flex p-[6px] rounded-[36px] border-[2px] border-neutrals6 w-full gap-[12px] h-[52px]">
      <button className={`p-[6px] w-full ${value === 0 ? "bg-neutrals1 text-neutrals9" : "bg-none text-neutrals2"} rounded-[90px]`} onClick={() => value && setTabValue(0)}>Stake</button>
      <button className={`p-[6px] w-full ${value === 1 ? "bg-neutrals1 text-neutrals9" : "bg-none text-neutrals2"} rounded-[90px]`} onClick={() => !value && setTabValue(1)}>Unstake</button>
    </div>
  );
}
