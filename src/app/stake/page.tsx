import { ClaimReward } from '@/components/ClaimReward/index.js';
import { ProjectDetailCard } from '@/components/ProjectDetailCard/index.js';
import { StakeRanking } from '@/components/StakeRanking/index.js';
import { StakeTokenInfo } from '@/components/StakeTokenInfo/index.js';
import { StakeTokenInput } from '@/components/StakeTokenInput/index.js';

export default function Stake() {
    return (
        <div className="flex h-full flex-col items-center bg-black px-[24px] lg:max-w-[1024px] lg:p-0">
            <div
                className="absolute mb-[48px] flex h-[520px] w-full flex-col items-center justify-end px-[24px] lg:relative lg:px-0 "
                style={{
                    background: 'url(/KV-meson.png)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <ProjectDetailCard />
            </div>
            <div className="h-[780px] lg:hidden" />
            <div className="flex w-full flex-col gap-[24px] lg:flex-row">
                <StakeTokenInfo />
                <ClaimReward />
            </div>
            <div className="mt-[51px] flex w-full flex-col gap-[24px] lg:flex-row">
                <StakeTokenInput />
                <StakeRanking />
            </div>
        </div>
    );
}
