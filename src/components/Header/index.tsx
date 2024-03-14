"use client";

import { ConnectXButton } from "./ConnectXButton.js";
import { NavTabs } from "./NavTabs.js";
import { Image } from "@/esm/Image.js";
import { useSession } from "next-auth/react"
import { ConnectWalletButton } from "./ConnectWalletButton.js"

export function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="flex lg:p-[20px] justify-between items-center bg-black/10 fixed top-0 w-full">
      <div className="flex items-center">
        <div className="flex items-center justify-between gap-[32px]">
          <Image src="/logo.svg" alt="Logo" width={100} height={100} />
          <div className="h-full w-[1px] rouned-[1px] bg-black/10" />
        </div>
        <NavTabs />
      </div>
      {status === "authenticated" ? null : <ConnectXButton />}
      {status === "authenticated" ? <ConnectWalletButton /> : null}
    </header>
  );
}
