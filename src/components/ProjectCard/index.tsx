import { Image } from "@/esm/Image.js"
import { Link } from "@/esm/Link.js"

const projectInfo = {
  symbol: "SLN",
  name: "SmartLayer.network",
  logo: "/sln.svg",
  color: "var(--line-green)"

}

export function ProjectCard() {
  return <div className="flex max-w-[680px] p-[16px] flex-col rounded-[16px]" style={{ background: 'var(--line-green)' }}>
    <div className="flex items-center justify-between">
      <div>
        <div className="flex gap-[10px]">
          <Image src={projectInfo.logo} alt="SLN logo" width={48} height={48} />
          <div className="text-neutrals9 text-[32px] leading-[40px]">{projectInfo.symbol}</div>
        </div>
      </div>
    </div>
    <Link className="mt-[12px] text-neutrals8 text-[24px] leading-[32px]" href="#">
      {projectInfo.name}
    </Link>
    <div className="text-neutrals9 text-[14px] leading-[22px]">Token front-ends drive a new paradigm in token utility and liquidity</div>
    <div className="text-neutrals9 text-[14px] leading-[22px] mt-[8px]">Smart Layer is a unique solution that addresses the challenges of integration, privacy, and trust in the digital landscape. It introduces a new layer of integration that enables trustless token logic, paving the way for a tokenized web with unlimited integration potential.</div>
    <button className="bg-neutrals9 py-[12px] px-[24px] flex justify-center items-center text-[16px] leading-[16px] rounded-[99px] text-neutrals1 mt-[12px]">Stake MASK to Earn {projectInfo.symbol}</button>
  </div>
}
