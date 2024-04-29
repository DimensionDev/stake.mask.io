'use client';

import { IS_TESTNET, STAKE_MANAGER_TEST, STAKE_MANAGER, STAKE_MANAGER_CONTRACT } from '@/constants/index.js';
import { Image } from '@/esm/Image.js';
import { useQuery } from '@tanstack/react-query';
import { StakeManagerABI } from '@/abis/stakeManager.js';
import { readContract } from 'wagmi/actions';
import { useAccount } from 'wagmi';
import { formatEther } from 'viem';
import MASK from '@/assets/logos/mask.svg';
import { MainButton } from '../MainButton.js';

export function StakeCard() {
    const { address } = useAccount();
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
    console.log(data);
    return (
        <div className="flex h-[196px] flex-col rounded-[16px] border-[1px] border-neutrals6 p-[16px]">
            <Image
                src="/glow.png"
                width={280}
                height={200}
                alt="right"
                className="z-1 absolute left-[-35px] top-[-30px]"
            />
            <div className="text-[20px] font-bold text-white">Staked MASK</div>
            <div className="w-full text-center text-[48px] leading-[48px] text-white ">
                {data?.stakeAmount ? formatEther(data.stakeAmount) : 0}
            </div>
            <div className="mb-[12px] w-full text-center text-[16px] text-white">+3 Points/h</div>
            <MainButton onClick={() => {}}>
                <MASK width={16} height={16} />
                Stake MASK
            </MainButton>
        </div>
    );
}
