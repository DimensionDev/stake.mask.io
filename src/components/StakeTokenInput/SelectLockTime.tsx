interface SelectLockTimeProps {
  lockTime: number;
  setLockTime: (value: number) => void;
}
export function SelectLockTime({ lockTime, setLockTime }: SelectLockTimeProps) {
  return <div className="flex flex-col gap-[12px] w-full">
    <div className="text-[16px] text-neutrals4">
      Select lock time
    </div>
    <div className="flex gap-[12px]">
      <button className={`text-[16px] ${lockTime === 0 ? "bg-neutrals1 text-neutrals8" : "bg-none text-neutrals2"} py-[12px] px-[16px] rounded-[90px] border-[2px] border-neutrals6 flex-1`} onClick={() => { if (lockTime !== 0) setLockTime(0) }}>1 Month</button>
      <button className={`text-[16px] ${lockTime === 1 ? "bg-neutrals1 text-neutrals8" : "bg-none text-neutrals2"} py-[12px] px-[16px] rounded-[90px] border-[2px] border-neutrals6 flex-1`} onClick={() => { if (lockTime !== 0) setLockTime(1) }}>2 Month</button>
      <button className={`text-[16px] ${lockTime === 2 ? "bg-neutrals1 text-neutrals8" : "bg-none text-neutrals2"} py-[12px] px-[16px] rounded-[90px] border-[2px] border-neutrals6 flex-1`} onClick={() => { if (lockTime !== 0) setLockTime(2) }}>3 Month</button>
    </div>
    <div className="text-[16px] text-neutrals4">
      The longer the duration chosen for staking MASK, the higher the multiplier for the rewards.
    </div>
  </div>
}
