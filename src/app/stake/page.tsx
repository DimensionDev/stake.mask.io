import { EstimatedRewards } from '@/components/EstimatedRewards/index.js';
import { ProfileCard } from '@/components/ProfileCard/index.js';
import { ProjectDetailCard } from '@/components/ProjectDetailCard/index.js';
import { StakeCard } from '@/components/StakeCard/index.js';
import { StakeRanking } from '@/components/StakeRanking/index.js';

export default function Stake() {
    return (
        <div className="flex h-full flex-col items-center bg-black px-[24px] lg:max-w-[1600px] lg:p-0">
            <div
                className="absolute mb-[48px] flex h-[520px] w-full flex-col items-center justify-end px-[24px] lg:px-0 "
                style={{
                    background:
                        'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0) 50%, rgba(0,0,0,1)),url(/KV.png)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
             />
            <div className="h-[300px]" />
            <ProjectDetailCard />
            <div className="flex w-full flex-col gap-[24px] mt-[32px] lg:grid lg:grid-cols-4 ">
                <ProfileCard />
                <StakeCard />
                <EstimatedRewards />
            </div>
            <div className="mt-[51px] flex w-full flex-col gap-[24px] lg:flex-row">
                <StakeRanking />
            </div>
        </div>
    );
}
