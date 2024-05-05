import { ProjectCard } from '@/components/ProjectCard/index.js';
import { StakeRanking } from '@/components/StakeRanking/index.js';
import { redirect } from 'next/navigation.js';

export default function Home() {
    redirect('/stake');
    return (
        <div className="flex h-full flex-col items-center bg-black px-[24px] lg:max-w-[1024px] lg:p-0">
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
            <ProjectCard />
            <StakeRanking />
            <div className="h-[72px]" />
        </div>
    );
}
