import ETHIcon from "@/assets/logos/eth.svg"

export function StakeTokenInput() {
  return <div className="border-[1px] p-[16px] rounded-[16px] border-neutrals6 flex flex-col w-full" >
    <div className="flex justify-between items-center">
      <div className="text-neutrals2 text-[24px]">Farm Mask</div>
      <div className="flex gap-[8px] py-[6px] px-[8px] rounded-[8px] bg-blueBg justify-center items-center text-neutrals8 text-[14px]">
        <ETHIcon width={16} height={16} /> ETH
      </div>
    </div>
  </div>
}
