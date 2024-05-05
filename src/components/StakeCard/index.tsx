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
    const { address } = useAccount();
    const setIsOpen = useStakeModalStore((state) => state.setIsOpen);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['stake'],
        queryFn: async () => {
            if (!address) return {};
            const [stakeAmount, poolId] = await readContract({
                ...STAKE_MANAGER_CONTRACT,
                functionName: 'userInfos',
                args: [address],
            });
            return { stakeAmount, poolId };
        },
    });

    return (
        <div className="relative flex h-[196px] flex-col rounded-[16px] border-[1px] border-neutrals6 p-[16px]">
            <Image
                src="/glow.png"
                width={360}
                height={230}
                alt="right"
                className="absolute left-[-35px] top-[-30px] z-50"
            />
            <div className="text-[20px] font-bold text-white">Staked MASK</div>
            <div className="w-full text-center text-[48px] leading-[48px] text-white ">
                {data?.stakeAmount ? formatEther(data.stakeAmount) : 0}
            </div>
            <div className="mb-[12px] w-full text-center text-[16px] text-white">+3 Points/h</div>
            <MainButton
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                <MASK width={16} height={16} />
                Stake MASK
            </MainButton>
        </div>
    );
}
