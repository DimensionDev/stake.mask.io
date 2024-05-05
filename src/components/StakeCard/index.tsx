'use client';

import { useQuery } from '@tanstack/react-query';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';
import { readContract } from 'wagmi/actions';

import MASK from '@/assets/logos/mask.svg';
import { MainButton } from '@/components/MainButton.js';
import { STAKE_MANAGER_CONTRACT } from '@/constants/index.js';
import { Image } from '@/esm/Image.js';
import { useStakeModalStore } from '@/store/useStakeModalStore.js';

export function StakeCard() {
  const { address } = useAccount()
  const setIsOpen = useStakeModalStore((state) => state.setIsOpen)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['stake'],
    queryFn: async () => {
      if (!address) return {}
      const [stakeAmount, poolId] = await readContract({
        ...STAKE_MANAGER_CONTRACT, functionName: 'userInfos', args: [address]
      });
      return { stakeAmount, poolId }
    }
  })

  return <div className="flex flex-col border-[1px] border-neutrals6 h-[196px] rounded-[16px] p-[16px] relative">
    <Image src="/glow.png" width={360} height={230} alt='right' className='absolute top-[-30px] left-[-35px] z-50' />
    <div className='text-white text-[20px] font-bold'>Staked MASK</div>
    <div className='text-white text-[48px] w-full text-center leading-[48px] '>{data?.stakeAmount ? formatEther(data.stakeAmount) : 0}</div>
    <div className='text-white text-[16px] w-full text-center mb-[12px]'>+3 Points/h</div>
    <MainButton onClick={() => { setIsOpen(true) }} >
      <MASK width={16} height={16} />
      Stake MASK
    </MainButton>
  </div>
}
