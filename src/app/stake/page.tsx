'use client'

import { EstimatedRewards } from '@/components/EstimatedRewards/index.js';
import { ProfileCard } from '@/components/ProfileCard/index.js';
import { ProjectDetailCard } from '@/components/ProjectDetailCard/index.js';
import { StakeCard } from '@/components/StakeCard/index.js';
import { StakeModal } from '@/components/StakeModal/index.js';
import { useAccount } from 'wagmi';
import { StakeRanking } from '@/components/StakeRanking/index.js';

export default function Stake() {
    const { address } = useAccount();
    return (
        <div className="flex h-full flex-col items-center bg-black px-[24px] w-full lg:max-w-[1200px] lg:p-0">
            <div
                className="absolute flex h-[520px] w-full flex-col justify-end lg:pb-[120px]"
                style={{
                    background:
                        'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0) 50%, rgba(0,0,0,1)),url(/KV.png)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="text-center text-[32px] font-[590] text-neutrals1">Welcome to Mask Network</div>
                <div className="text-center text-[16px] font-[590] text-neutrals4">
                    This website is specifically created for Mask investors and believers, where you can stake $Mask to
                    earn token rewards!
                </div>
            </div>
            <div className="h-[520px]" />
            <ProjectDetailCard />
            {address ?
                <div className="flex w-full flex-col gap-[24px] mt-[32px] lg:grid lg:grid-cols-4 ">
                    <ProfileCard />
                    <StakeCard />
                    <EstimatedRewards rewardToken='rss3' />
                    <EstimatedRewards rewardToken='ton' />
                </div> : null}
            <div className="mt-[51px] flex w-full flex-col gap-[24px] lg:flex-row">
                <StakeRanking />
            </div>
            <StakeModal />
        </div>
    );
}
