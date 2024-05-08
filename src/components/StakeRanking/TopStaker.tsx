import Crown from '@/assets/crown.svg';
import { Image } from '@/esm/Image.js';
import { nFormatter } from '@/helpers/formatCommentCounts.js';

interface StakerProps {
    amount: number;
    name: string;
    avatar: string;
}

export function TopStaker({ amount, name, avatar }: StakerProps) {
    return (
        <div className="relative flex flex-col items-center space-y-4">
            <Crown width={36} height={36} className="absolute right-[-10px] top-[10px]" />
            <Image
                src={avatar}
                width={82}
                height={82}
                className="rounded-[99px] border-[2px] border-white"
                alt="avatar"
            />
            <div
                className="absolute bottom-5 flex items-center justify-center gap-[4px] rounded-[99px] px-[10px] py-[6px] text-[14px] font-bold text-neutrals9"
                style={{ background: 'var(--line-purple)' }}
            >
                {nFormatter(amount, 0)} PTS
            </div>
            <div className=" text-[12px] text-neutrals1">{name}</div>
        </div>
    );
}
