import SLNWithNetwork from '@/assets/logos/sln-network.svg';
import { Link } from '@/esm/Link.js';

const projectInfo = {
    symbol: 'SLN',
    name: 'SmartLayer.network',
    logo: '/sln.svg',
    color: 'var(--line-purple)',
};

export function ProjectCard() {
    return (
        <div
            className="my-[64px] flex flex-col rounded-[16px] p-[16px]"
            style={{ background: 'var(--line-purple)' }}
        >
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-[10px]">
                        <SLNWithNetwork width={48} height={48} />
                        <div className="text-[32px] leading-[40px] text-neutrals9">{projectInfo.symbol}</div>
                    </div>
                </div>
            </div>
            <Link className="mt-[12px] text-[24px] leading-[32px] text-neutrals8" href="#">
                {projectInfo.name}
            </Link>
            <div className="text-[14px] leading-[22px] text-neutrals9">
                Token front-ends drive a new paradigm in token utility and liquidity
            </div>
            <div className="mt-[8px] text-[14px] leading-[22px] text-neutrals9">
                Smart Layer is a unique solution that addresses the challenges of integration, privacy, and trust in the
                digital landscape. It introduces a new layer of integration that enables trustless token logic, paving
                the way for a tokenized web with unlimited integration potential.
            </div>
            <button className="mt-[12px] flex items-center justify-center rounded-[99px] bg-neutrals9 px-[24px] py-[12px] text-[16px] leading-[16px] text-neutrals1">
                Stake MASK to Earn {projectInfo.symbol}
            </button>
        </div>
    );
}
