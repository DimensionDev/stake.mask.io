'use client';

import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { Image } from '@/esm/Image.js';
import { formatAddress } from '@/helpers/formatAddress.js';
import { stakeAPI } from '@/providers/StakeAPI.js';

export function ProfileCard() {
  const { address } = useAccount();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile", address],
    queryFn: async () => { const { data } = await stakeAPI.getUserInfo(address as string, "1"); return data },
  })

  return <div className="flex flex-col relative w-full mt-[10px]">
    <div className="h-[50px]" />
    <div className="absolute w-full h-[130px] z-10 top-[50px]" style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)' }} />
    <div className="flex absolute gap-[12px] items-start">
      <div className="flex items-center gap-[8px]">
        <div className="rounded-[99px] border-[2px] border-white top-[10px] relative w-[64px] h-[64px]">
          <Image src={data?.twitter_image ? data?.twitter_image : "/mask-network.svg"} alt="avatar" layout="fill" objectFit="cover" />
        </div>
        <div className="text-white text-[32px] font-bold leading-[40px] -mt-[10px]">
          {data?.twitter_display_name ? data.twitter_display_name : address && formatAddress(address as string)}
        </div>
      </div>
    </div>
    <div className="rounded-[16px] h-[130px] flex justify-end items-end p-[16px] flex-col" style={{ background: 'var(--line-purple)' }}>
      <div className="flex flex-col z-50">
        <div className="text-[32px] text-white text-end">{data?.score}</div>
        <div className="text-white/50 text-[16px]">TOTAL POINTS</div>
      </div>
    </div>

  </div>
}
