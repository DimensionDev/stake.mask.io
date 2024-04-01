import { TopStaker } from "./TopStaker.js";
import { Staker } from "./Staker.js";

export function StakeRanking() {
  return <div className="border-[1px] p-[16px] rounded-[16px] border-neutrals6 flex flex-col w-full" >
    <div className="text-neutrals2 text-[24px]">Staking Ranking</div>
    <div className="flex w-full justify-center items-center mt-[64px]">
      <TopStaker avatar="https://pbs.twimg.com/profile_images/1745828800531992576/pVBm-qbm_400x400.jpg" name="ddd009" amount={100} />
    </div>
    <div className="grid grid-cols-3 gap-[28px] mt-[28px]">
      {(new Array(11).fill(0)).map((_, index) => <Staker key={index} isTop={index < 3} avatar="https://pbs.twimg.com/profile_images/1745828800531992576/pVBm-qbm_400x400.jpg" name="ddd009" amount={100} />)}
    </div>
  </div>
}
