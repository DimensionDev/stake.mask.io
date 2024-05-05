'use client'

import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

import RSS3 from '@/assets/logos/rss3.svg'
import TON from '@/assets/logos/ton.svg'
import { MainButton } from '@/components/MainButton.js'
import { Image } from '@/esm/Image.js'
import { stakeAPI } from '@/providers/StakeAPI.js'
import { writeContract } from 'wagmi/actions'
import { POOL_ID, REWARD_CONTRACT } from '@/constants/index.js'
interface EstimatedRewardsProps {
  rewardToken: string
}

export function EstimatedRewards({ rewardToken }: EstimatedRewardsProps) {
  const { address } = useAccount()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile", address],
    queryFn: async () => { const { data } = await stakeAPI.getUserInfo(address as string, "1"); return data },
  })

  const rewardPool = data?.reward_pool?.find((pool: any) => pool.name === rewardToken)

  return <div className="flex flex-col border-[1px] border-neutrals6 h-[196px] rounded-[16px] p-[16px] relative">
    <Image src="/glow.png" width={360} height={230} alt='right' className='absolute top-[-30px] left-[-35px] z-50' />
    <div className='text-white text-[20px] font-bold'>Estimated Rewards</div>
    <div className='flex gap-[12px] mt-[12px] mb-[13px] items-center w-full justify-center'>
      {
        rewardToken === 'rss3' ? <RSS3 width={48} height={48} /> : <TON width={48} height={48} />
      }
      <div className='flex flex-col'>
        <div className='text-neutrals1 text-[24px] w-full'>{Number(rewardPool?.amount).toFixed(2) || 0}</div>
        <div className='text-neutrals1 text-[16px] w-full'>{rewardToken === 'rss3' ? "RSS3" : "TON"}</div>
      </div>
    </div>
    <MainButton onClick={() => {
      if (!rewardPool) return
      writeContract({
        ...REWARD_CONTRACT,
        functionName: 'claim',
        args: [rewardPool.reward_pool_id, BigInt(rewardPool.big_amount), [rewardPool.proof]],
      })
    }} >
      Claim
    </MainButton>
  </div>
}
