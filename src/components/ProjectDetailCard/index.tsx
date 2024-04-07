import { Link } from '@/esm/Link.js';
import SLNLogo from '@/assets/logos/sln-network.svg';
import LinkIcon from '@/assets/link.svg';

const projectInfo = {
  symbol: 'SLN',
  name: 'SmartLayer.network',
  logo: '/sln.svg',
  color: 'var(--line-green)',
};

export function ProjectDetailCard() {
  return (
    <div
      className="relative flex w-full top-[200px] lg:top-0 flex-col rounded-[12px] p-[24px] bg-white/[0.03] backdrop-blur-[10px] border-[1px] border-white/[0.07]"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex gap-[10px]">
            <SLNLogo className="w-[48px] h-[48px]" />
            <div className="text-[32px] leading-[40px] text-neutrals1">{projectInfo.symbol}</div>
          </div>
        </div>
        <div className="flex flex-col "></div>
      </div>
      <Link className="mt-[24px] text-[24px] leading-[32px] text-neutrals1" href="#">
        {projectInfo.name} <LinkIcon className="w-[16px] h-[16px]" />
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
        The tokens earned through the event are pre-mined and will need to be deposited into the contract before they can be claimed.
      </div>
    </div>
  );
}
