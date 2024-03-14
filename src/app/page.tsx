import { ProjectCard } from "@/components/ProjectCard/index.js";

export default function Home() {
  return <div className="flex flex-col bg-black h-full items-center">
    <div className="flex flex-col justify-end align-bottom w-full h-[520px] mb-[96px]" style={{ background: "url(/KV.png)" }}>
      <div className="text-[32px] text-neutrals1 text-center">Stake $MASK for Rewards</div>
      <div className="text-[16px] text-neutrals4 text-center">This website is specifically created for Mask investors and believers, where you can stake $Mask to earn token rewards!</div>
    </div>
    <ProjectCard />
  </div>
}
