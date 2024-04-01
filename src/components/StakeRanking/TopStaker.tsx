import { Image } from "@/esm/Image.js";
import MaskIcon from "@/assets/logos/mask.svg";
import Crown from "@/assets/crown.svg";

interface StakerProps {
  amount: number;
  name: string;
  avatar: string;
}

export function TopStaker({ amount, name, avatar }: StakerProps) {
  return <div className="flex flex-col space-y-4 relative items-center">
    <Crown width={36} height={36} className="absolute top-[10px] right-[-10px]" />
    <Image src={avatar} width={82} height={82} className="border-white border-[2px] rounded-[99px]" alt="avatar" />
    <div className="rounded-[99px] flex gap-[4px] py-[6px] px-[10px] text-neutrals9 text-[14px] items-center justify-center absolute bottom-5" style={{ background: "var(--line-green)" }}>
      {amount} <MaskIcon width={16} height={16} />
    </div>
    <div className=" text-[12px] text-neutrals1">
      {name}
    </div>
  </div>
}
