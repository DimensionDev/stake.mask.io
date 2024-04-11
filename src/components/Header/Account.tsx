import X from "@/assets/logos/x.svg"
import { Image } from "@/esm/Image.js"

export function Account() {
    return (
        <div className="relative flex h-[40px] w-[40px] rounded-[99px] border-[1px] border-neutrals6">
            <Image
                src={'https://pbs.twimg.com/profile_images/1745828800531992576/pVBm-qbm_400x400.jpg'}
                layout="fill"
                alt="avatar"
                className="rounded-[99px]"
            />
            <div className="absolute bottom-0 right-0 rounded-[99px] border-[1px] border-neutrals6 bg-neutrals9">
                <X width={10} height={10} />
            </div>
        </div>
    );
}
