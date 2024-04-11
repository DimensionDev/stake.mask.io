import Close from "@/assets/close.svg"
import { Account } from "@/components/Header/Account.js"

export function ProfileInfo() {
    return (
        <div className="flex w-full flex-col items-center gap-[24px]">
            <div className="flex w-full items-center justify-between">
                <div className="text-[32px] text-neutrals2">Profile</div>
                <div className="flex items-center justify-center border-[2px] border-neutrals6 bg-neutrals9">
                    <Close width={24} height={24} />
                </div>
            </div>
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-[12px]">
                    <Account />
                    Makenna Torff
                </div>
                <button className="rounded-[99px] border-[2px] border-neutrals6 bg-neutrals9 px-[8px] py-[6px] text-[14px] text-neutrals2">
                    Change
                </button>
            </div>
        </div>
    );
}
