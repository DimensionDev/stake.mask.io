'use client'

import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

import RSS3 from '@/assets/logos/rss3.svg'
import { MainButton } from '@/components/MainButton.js'
import { Image } from '@/esm/Image.js'
import { stakeAPI } from '@/providers/StakeAPI.js'

export function EstimatedRewards() {
  const { address } = useAccount()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile", address],
    queryFn: async () => { const { data } = await stakeAPI.getUserInfo(address as string, "1"); return data },
  })

  return <div className="flex flex-col border-[1px] border-neutrals6 h-[196px] rounded-[16px] p-[16px] relative">
    <Image src="/glow.png" width={360} height={230} alt='right' className='absolute top-[-30px] left-[-35px] z-50' />
    <div className='text-white text-[20px] font-bold'>Estimated Rewards</div>
    <div className='flex gap-[12px] mt-[12px] mb-[13px] items-center w-full justify-center'>
      <RSS3 width={48} height={48} />
      <div className='flex flex-col'>
        <div className='text-neutrals1 text-[24px] w-full'>{data?.score_per_hour || 0}</div>
        <div className='text-neutrals1 text-[16px] w-full'>RSS3</div>
      </div>
    </div>
    <MainButton onClick={() => { }} >
      Claim
    </MainButton>
  </div>
}
