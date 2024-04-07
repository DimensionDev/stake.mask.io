import Close from "@/assets/close.svg"
import { Account } from "./Account.js"

export function ProfileInfo() {
  return <div className="flex flex-col items-center w-full gap-[24px]">
    <div className="flex items-center w-full justify-between">
      <div className="text-[32px] text-neutrals2">Profile</div>
      <div className="bg-neutrals9 border-[2px] border-neutrals6 flex items-center justify-center">
        <Close width={24} height={24} />
      </div>
    </div>
    <div className="flex items-center w-full justify-between">
      <div className="flex items-center gap-[12px]">
        <Account />
        Makenna Torff
      </div>
      <button className="text-neutrals2 rounded-[99px] px-[8px] py-[6px] text-[14px] bg-neutrals9 border-[2px] border-neutrals6">Change</button>
    </div>
  </div>
}
