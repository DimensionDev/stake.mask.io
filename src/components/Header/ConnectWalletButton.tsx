import { Image } from "@/esm/Image.js"
export function ConnectWalletButton() {
  return <button className=" text-neutrals9 py-[12px] px-[24px] text-[14px] font-normal leading-[16px] text-center rounded-lg flex items-center gap-[4px]" style={{ background: 'var(--line-green)' }} onClick={() => { }}>
    <div
      className={`flex p-[8px] bg-neutrals9 rounded-[99px]`}>
      <Image src="/wallet.svg" alt="Wallet" width={20} height={20} />
    </div>
    Connect your wallet
  </button>
}
