'use client';

import { useAccount } from "wagmi"

import Close from "@/assets/close.svg"
import Metamask from "@/assets/logos/metamask.svg"
import { MainButton } from "@/components/MainButton.js"
import { formatAddress } from "@/helpers/formatAddress.js"

export function WalletInfo() {
  const { address } = useAccount();
  return <div className="flex flex-col items-center w-full gap-[24px]">
    <div className="flex items-center w-full justify-between">
      <div className="text-[32px] text-neutrals2">Profile</div>
      <div className="bg-neutrals9 border-[2px] border-neutrals6 flex items-center justify-center">
        <Close width={24} height={24} />
      </div>
    </div>
    <div className="flex w-full p-[8px] gap-[8px] items-center rounded-[8px] bg-neutrals7">
      <div className="flex w-[30px] h-[30px] rounded-full bg-neutrals8 items-center justify-center">
        <Metamask width={30} height={30} />
      </div>
      <div className="flex flex-1 items-center">{address ? formatAddress(address) : null}</div>
      <MainButton onClick={() => { }}>Change</MainButton>
    </div>
  </div>
}
