'use client';

import { useAccount, useDisconnect } from "wagmi"


export function WalletInfo() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  return <div className="flex flex-col items-center w-full p-[12px] gap-[8px] bg-neutrals8 rounded-[20px]">
    <div className="flex items-center w-full justify-between">
    </div>
    <button className="flex w-[296px] text-center justify-center p-[8px] gap-[8px] items-center rounded-[8px] text-neutrals1 font-bold hover:bg-neutrals9">
      Edit
    </button>
    <button className="flex w-[296px] text-center justify-center p-[8px] gap-[8px] items-center rounded-[8px] text-neutrals1 font-bold hover:bg-neutrals9" onClick={() => { disconnect() }}>
      Log out
    </button>
  </div>
}
