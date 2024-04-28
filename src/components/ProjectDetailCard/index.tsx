import LinkIcon from '@/assets/link.svg';
import SLNLogo from '@/assets/logos/sln-network.svg';
import { Link } from '@/esm/Link.js';

const projectInfo = {
    symbol: 'SLN',
    name: 'SmartLayer.network',
    logo: '/sln.svg',
    color: 'var(--line-purple)',
};

export function ProjectDetailCard() {
    return (
        <div className="flex w-full flex-col rounded-[12px] border-[1px] border-white/[0.07] bg-white/[0.03] p-[24px] backdrop-blur-[10px]">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex gap-[10px]">
                        <SLNLogo className="h-[48px] w-[48px]" />
                        <div className="text-[32px] leading-[40px] text-neutrals1">{projectInfo.symbol}</div>
                    </div>
                </div>
                <div className="flex flex-col " />
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
