'use client';

import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'
import { writeContract } from 'wagmi/actions'

import RSS3 from '@/assets/logos/rss3.svg'
import TON from '@/assets/logos/ton.svg'
import { MainButton } from '@/components/MainButton.js'
import { REWARD_CONTRACT } from '@/constants/index.js'
import { Image } from '@/esm/Image.js'
import { stakeAPI } from '@/providers/StakeAPI.js'

interface EstimatedRewardsProps {
  rewardToken: string;
}

export function EstimatedRewards({ rewardToken }: EstimatedRewardsProps) {
  const { address } = useAccount();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile', address],
    queryFn: async () => {
      const { data } = await stakeAPI.getUserInfo(address as string, '1');
      return data;
    },
  });

  const rewardPool = data?.reward_pool?.find((pool: any) => pool.name === rewardToken);

  return (
    <div className="relative flex h-[196px] flex-col rounded-[16px] border-[1px] border-neutrals6 p-[16px]">
      <Image
        src="/glow.png"
        width={360}
        height={230}
        alt="right"
        className="absolute left-[-35px] top-[-30px] z-50"
      />
      <div className="text-[20px] font-bold text-white">Estimated Rewards</div>
      <div className="mb-[13px] mt-[12px] flex w-full items-center justify-center gap-[12px]">
        {rewardToken === 'rss3' ? <RSS3 width={48} height={48} /> : <TON width={48} height={48} />}
        <div className="flex flex-col">
          <div className="w-full text-[24px] text-neutrals1">
            {Number(rewardPool?.amount).toFixed(2) || 0}
          </div>
          <div className="w-full text-[16px] text-neutrals1">{rewardToken === 'rss3' ? 'RSS3' : 'TON'}</div>
        </div>
      </div>
      <MainButton
        onClick={() => {
          if (!rewardPool) return;
          writeContract({
            ...REWARD_CONTRACT,
            functionName: 'claim',
            args: [rewardPool.reward_pool_id, BigInt(rewardPool.big_amount), [rewardPool.proof]],
          });
        }}
      >
        Claim
      </MainButton>
    </div>
  );
}
