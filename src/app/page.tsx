import { ProjectCard } from '@/components/ProjectCard/index.js';

export default function Home() {
    return (
        <div className="flex h-full flex-col items-center bg-black lg:max-w-[1024px]">
            <div
                className="-mb-[30px] flex h-[520px] w-full flex-col justify-end pb-[120px]"
                style={{
                    background: 'url(/KV.png)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="text-center text-[32px] text-neutrals1">Stake $MASK for Rewards</div>
                <div className="text-center text-[16px] text-neutrals4">
                    This website is specifically created for Mask investors and believers, where you can stake $Mask to
                    earn token rewards!
                </div>
            </div>
            <ProjectCard />
        </div>
    );
}
