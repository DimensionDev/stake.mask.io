import LinkIcon from '@/assets/link.svg';
import SLNLogo from '@/assets/logos/sln-network.svg';
import { Link } from '@/esm/Link.js';
import { Image } from '@/esm/Image.js';

const projectInfo = {
    symbol: 'SLN',
    name: 'SmartLayer.network',
    logo: '/sln.svg',
    color: 'var(--line-purple)',
};

export function ProjectDetailCard() {
    return (
        <div className="flex w-full flex-col rounded-[12px] p-[24px] z-50" style={{ background: 'var(--line-purple)' }}>
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex gap-[10px]">
                        <div className="text-[48px] leading-[56px] text-neutrals9 font-bold">Stake MASK</div>
                        <div className='rounded-[4px] text-linePurple text-[14px] font-bold bg-neutrals9 h-[22px] px-[6px] flex items-center'><Image src="/no1.svg" width={29} height={14} alt="no.1" /></div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className='flex flex-col'>

                    </div>
                </div>
            </div>
            <Link className="mt-[24px] text-[24px] leading-[32px] text-neutrals1" href="#">
                {projectInfo.name} <LinkIcon className="h-[16px] w-[16px]" />
            </Link>
            <div className="text-[14px] leading-[22px] text-neutrals1">
                Token front-ends drive a new paradigm in token utility and liquidity
            </div>
            <div className="mt-[8px] text-[14px] leading-[22px] text-neutrals1">
                Smart Layer is a unique solution that addresses the challenges of integration, privacy, and trust in the
                digital landscape. It introduces a new layer of integration that enables trustless token logic, paving
                the way for a tokenized web with unlimited integration potential.
            </div>
            <div className="mt-[8px] text-[14px] leading-[22px] text-secondary3">
                The tokens earned through the event are pre-mined and will need to be deposited into the contract before
                they can be claimed.
            </div>
        </div>
    );
}
