import { Staker } from '@/components/StakeRanking/Staker.js';
import { TopStaker } from '@/components/StakeRanking/TopStaker.js';

export function StakeRanking() {
    return (
        <div className="relative flex w-full flex-col rounded-[16px] border-[1px] border-neutrals6 p-[16px]">
            <div
                className="absolute top-0 z-50 h-full w-full"
                style={{
                    background: 'linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0) 50%,rgba(0,0,0,0) 75%, rgba(0,0,0,1) )',
                }}
            />
            <div className="text-[24px] font-bold text-neutrals2">Staking Ranking</div>
            <div className="mt-[64px] flex w-full items-center justify-center">
                <TopStaker
                    avatar="https://pbs.twimg.com/profile_images/1745828800531992576/pVBm-qbm_400x400.jpg"
                    name="ddd009"
                    amount={100}
                />
            </div>
            <div className="mt-[28px] grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-[28px]">
                {new Array(30).fill(0).map((_, index) => (
                    <Staker
                        key={index}
                        isTop={index < 3}
                        avatar="https://pbs.twimg.com/profile_images/1745828800531992576/pVBm-qbm_400x400.jpg"
                        name="ddd009"
                        amount={100}
                    />
                ))}
            </div>
        </div>
    );
}
