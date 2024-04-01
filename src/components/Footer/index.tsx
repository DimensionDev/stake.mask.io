import { Image } from "@/esm/Image.js"
import { Info } from "./Info.js"
import { BottomBar } from "./BottomBar.js"
export function Footer() {
  return <div className="flex-col w-full bg-black hidden md:flex">
    <div
      className="w-full relative aspect-[6]"  >
      <Image src='/masknetwork.png' alt="Mask Network" layout="fill" />
    </div>
    <Info />
    <BottomBar />
  </div>
}
