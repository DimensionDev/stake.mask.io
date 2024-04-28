import MaskIcon from '@/assets/logos/mask.svg';
import { Image } from '@/esm/Image.js';

interface StakerProps {
    amount: number;
    name: string;
    avatar: string;
    isTop?: boolean;
}

export function Staker({ amount, name, avatar, isTop }: StakerProps) {
    return (
        <div className="relative flex flex-col items-center space-y-4">
            <Image
                src={avatar}
                width={64}
                height={64}
                className="rounded-[99px] border-[2px] border-white"
                alt="avatar"
            />
            <div
                className={`absolute bottom-5 flex gap-[4px] rounded-[99px] !bg-neutrals1 px-[10px] py-[6px] text-[14px] text-neutrals9 font-bold`}
                style={{ background: `${isTop ? 'var(--line-purple) !important' : ''}` }}
            >
                {amount} PTS
            </div>
            <div className=" text-[12px] text-neutrals1">{name}</div>
        </div>
    );
}
