import MaskIcon from '@/assets/logos/mask.svg';
export function StakeTokenInfo() {
    return (
        <div
            className="flex w-full flex-col rounded-[16px] p-[16px] text-neutrals8"
            style={{ background: 'var(--line-green)' }}
        >
            <div className="flex justify-between text-[12px] text-neutrals8">
                <div>Stake Token</div>
                <div>Liquidity</div>
            </div>
            <div className="mt-[8px] flex justify-between">
                <div className="flex items-center gap-[4px]">
                    <MaskIcon className="h-[36px] w-[36px]" />
                    <div className="text-[32px] leading-[48px]">MASK</div>
                </div>
                <div className="text-[40px] leading-[48px]">2.0M</div>
            </div>
            <div className="mt-[12px] h-[1px] w-full rounded-[99px] bg-black/10" />
            <div className="mt-[12px] grid grid-cols-2 grid-rows-2 gap-[16px] lg:grid-cols-4 lg:grid-rows-1">
                <div className="flex flex-col items-center">
                    <div className="text-[12px] text-neutrals8">Wallet Balance</div>
                    <div className="text-[24px] text-neutrals8">45.4K</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-[12px] text-neutrals8">Staked</div>
                    <div className="text-[24px] text-neutrals8">19.39K</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-[12px] text-neutrals8">APY</div>
                    <div className="text-[24px] text-neutrals8">100.0M</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-[12px] text-neutrals8">Time Left</div>
                    <div className="text-[24px] text-neutrals8">10.0M</div>
                </div>
            </div>
        </div>
    );
}
