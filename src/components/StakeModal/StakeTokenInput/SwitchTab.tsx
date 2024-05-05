interface SwitchTabProps {
    setTabValue: (value: number) => void;
    value: number;
}
export function SwitchTab({ setTabValue, value }: SwitchTabProps) {
    return (
        <div className="flex h-[52px] w-full gap-[12px] rounded-[36px] border-[2px] border-neutrals6 p-[6px]">
            <button
                className={`w-full p-[6px] ${value === 0 ? 'bg-neutrals1 text-neutrals9' : 'bg-none text-neutrals2'} rounded-[90px]`}
                onClick={() => value && setTabValue(0)}
            >
                Stake
            </button>
            <button
                className={`w-full p-[6px] ${value === 1 ? 'bg-neutrals1 text-neutrals9' : 'bg-none text-neutrals2'} rounded-[90px]`}
                onClick={() => !value && setTabValue(1)}
            >
                Unstake
            </button>
        </div>
    );
}
