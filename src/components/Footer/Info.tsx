import { Image } from "@/esm/Image.js"
export function Info() {
  return <div className="flex pt-[64px] pb-[48px] px-[36px] border-y-[1px] border-neutrals6">
    <div className="flex flex-col gap-[32px]">
      <Image src='/logo.svg' alt="Mask Network" width={120} height={35} />
      <div className="text-[24px] leading-[32px] w-[256px] text-neutrals2">Your Portal To The New, Open Internet.</div>
    </div>

  </div>
}
