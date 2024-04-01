import { ClaimReward } from "@/components/ClaimReward/index.js";
import { ProjectDetailCard } from "@/components/ProjectDetailCard/index.js";
import { StakeRanking } from "@/components/StakeRanking/index.js";
import { StakeTokenInfo } from "@/components/StakeTokenInfo/index.js";
import { StakeTokenInput } from "@/components/StakeTokenInput/index.js";

export default function Stake() {
  return <div className="flex h-full flex-col items-center bg-black lg:max-w-[1024px]">
    <div
      className="flex -mb-[30px] h-[520px] w-full flex-col justify-end pb-[120px]"
      style={{ background: 'url(/KV-meson.png)', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
    >
      <ProjectDetailCard />
    </div>
    <div className="flex flex-col lg:flex-row w-full gap-[24px]">
      <StakeTokenInfo />
      <ClaimReward />
    </div>
    <div className="flex flex-col lg:flex-row w-full gap-[24px] mt-[51px]">
      <StakeTokenInput />
      <StakeRanking />
    </div>
  </div>
}
