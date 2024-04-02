import { TopStaker } from './TopStaker.js';
import { Staker } from './Staker.js';

export function StakeRanking() {
    return (
        <div className="flex w-full flex-col rounded-[16px] border-[1px] border-neutrals6 p-[16px]">
            <div className="text-[24px] text-neutrals2">Staking Ranking</div>
            <div className="mt-[64px] flex w-full items-center justify-center">
                <TopStaker
                    avatar="https://pbs.twimg.com/profile_images/1745828800531992576/pVBm-qbm_400x400.jpg"
                    name="ddd009"
                    amount={100}
                />
            </div>
            <div className="mt-[28px] grid grid-cols-3 gap-[28px]">
                {new Array(11).fill(0).map((_, index) => (
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
