import { Image } from "@/esm/Image.js";
import MaskIcon from "@/assets/logos/mask.svg";

interface StakerProps {
  amount: number;
  name: string;
  avatar: string;
  isTop?: boolean;
}

export function Staker({ amount, name, avatar, isTop }: StakerProps) {
  return <div className="flex flex-col space-y-4 relative items-center">
    <Image src={avatar} width={64} height={64} className="border-white border-[2px] rounded-[99px]" alt="avatar" />
    <div className={`rounded-[99px] flex gap-[4px] py-[6px] px-[10px] text-neutrals9 text-[14px] !bg-neutrals1 absolute bottom-5`} style={{ background: `${isTop ? "var(--line-blue) !important" : ""}` }}>
      {amount} <MaskIcon width={16} height={16} />
    </div>
    <div className=" text-[12px] text-neutrals1">
      {name}
    </div>
  </div>
}
