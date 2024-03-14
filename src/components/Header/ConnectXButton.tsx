"use client"

import { Image } from "@/esm/Image.js";
import { signIn } from "next-auth/react"

export function ConnectXButton() {
  return (
    <button className=" text-neutrals9 py-[12px] px-[24px] text-[14px] font-normal leading-[16px] text-center rounded-lg flex items-center gap-[4px]" style={{ background: 'var(--line-green)' }} onClick={() => { signIn("twitter") }}>
      <Image src="/x.svg" alt="x logo" width={16} height={16} />
      Connect with X
    </button>
  );
}
