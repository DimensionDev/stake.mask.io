import SLNLogo from '@/assets/logos/sln-network.svg';

export function ClaimReward() {
    return (
        <div
            className="flex w-full flex-col rounded-[16px] p-[16px] text-neutrals9"
            style={{ background: 'var(--line-green)' }}
        >
            <div className="flex justify-between">
                <div className="flex items-center gap-[4px]">
                    <SLNLogo className="h-[48px] w-[48px]" />
                    <div className="text-[32px] leading-[48px]">SLN</div>
                </div>
                <div className="text-[40px] leading-[48px]">1,300.0002</div>
            </div>
            <div className="mt-[12px] flex justify-between text-[14px] text-neutrals9">
                <div>Reward</div>
                <div>$ 23.00</div>
            </div>
            <button className="mt-[12px] flex h-[48px] items-center justify-center rounded-[99px] bg-neutrals9 px-[24px] py-[12px] text-[16px] leading-[16px] text-neutrals1">
                Claim
            </button>
        </div>
    );
}
