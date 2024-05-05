'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { readContract } from 'wagmi/actions';

import Add from '@/assets/add.svg';
import Mask from '@/assets/logos/mask.svg';
import RSS3 from '@/assets/logos/rss3.svg';
import Ton from '@/assets/logos/ton.svg';
import RightArrow from '@/assets/rightArrow.svg';
import { MainButton } from '@/components/MainButton.js';
import { publicClient } from '@/configs/wagmiClient.js';
import { IS_TESTNET, POOL_ID, STAKE_MANAGER_CONTRACT } from '@/constants/index.js';
import { Image } from '@/esm/Image.js';
import { stakeAPI } from '@/providers/StakeAPI.js';

interface ProjectCardProps {
    setIsOpen: (isOpen: boolean) => void;
}

export function ProjectDetailCard({ setIsOpen }: ProjectCardProps) {
    const { data: apyInfo } = useQuery({
        queryKey: ['poolinfo', 'apy'],
        queryFn: async () => {
            const res = stakeAPI.getPoolInfo(POOL_ID);
            return res;
        },
    });
    const { data: poolInfo } = useQuery({
        queryKey: ['poolinfo'],
        queryFn: async () => {
            const res = await readContract({
                ...STAKE_MANAGER_CONTRACT,
                functionName: 'pools',
                args: [BigInt(POOL_ID)],
            });

            const startTimeStamp = await publicClient({ chainId: IS_TESTNET ? 11155111 : 1 }).getBlock({
                blockNumber: res[0],
            });
            const endTimeStamp = Number(res[1] - res[0]) * 12 + Number(startTimeStamp.timestamp);
            return {
                startTime: new Date(Number(startTimeStamp.timestamp) * 1000),
                endTime: new Date(endTimeStamp * 1000),
            };
        },
    });

    const statusText = useMemo(() => {
        if (!poolInfo) return 'Not started';
        const now = Date.now();
        if (now < poolInfo.startTime.getTime()) return 'Not started';
        if (now < poolInfo.endTime.getTime()) return 'Ongoing';
        return 'Ended';
    }, [poolInfo]);

    return (
        <div
            className="z-40 flex w-full flex-col items-center rounded-[12px] p-[24px]"
            style={{ background: 'var(--line-purple)' }}
        >
            <div className="flex w-full flex-col justify-between lg:flex-row lg:items-center">
                <div>
                    <div className="flex gap-[10px]">
                        <div className=" text-[32px] font-bold leading-[56px] text-neutrals9 lg:text-[48px]">
                            Stake MASK
                        </div>
                        <div className="flex h-[22px] items-center rounded-[4px] bg-neutrals9 px-[6px] text-[14px] font-bold text-linePurple">
                            <Image src="/no1.svg" width={29} height={14} alt="no.1" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex h-[20px] w-[80px] items-center justify-center rounded-[6px] bg-neutrals9 text-[12px] font-semibold text-neutrals1">
                        {statusText}
                    </div>
                    <div className="text-[20px] font-bold leading-[28px] text-neutrals9">
                        Time:{' '}
                        {poolInfo
                            ? `${poolInfo.startTime.toLocaleDateString()} - ${poolInfo.endTime.toLocaleDateString()}`
                            : ''}
                    </div>
                </div>
            </div>
            <div className="mt-[24px] flex w-full flex-col gap-[24px] lg:flex-row">
                <div
                    className="flex w-full flex-col items-center gap-[24px] rounded-[16px] border-[1px] border-[white/0.07] bg-[white/0.1] p-[24px] lg:h-[152px] lg:max-w-[450px]"
                    style={{
                        boxShadow:
                            '0px 5px 10px 0px rgba(0, 0, 0, 0.05), 0px 15px 30px 0px rgba(0, 0, 0, 0.05), 0px 20px 40px 0px rgba(0, 0, 0, 0.05)',
                    }}
                >
                    <div className="flex flex-col items-center gap-[4px] lg:flex-row">
                        <RSS3 width={48} height={48} />
                        <div className="flex flex-col">
                            <div className="text-[24px] font-bold text-neutrals8">700,000</div>
                            <div className="text-[16px] font-bold text-neutrals8">RSS3</div>
                        </div>
                        <Add width={24} height={24} />
                        <Ton width={48} height={48} />
                        <div className="flex flex-col">
                            <div className="text-[24px] font-bold text-neutrals8">20,000</div>
                            <div className="text-[16px] font-bold text-neutrals8">TON</div>
                        </div>
                    </div>
                    <div className="text-[14px] font-bold text-neutrals6">Total Rewards</div>
                </div>
                <div
                    className="flex h-[152px] w-full flex-col items-center gap-[24px] rounded-[16px] border-[1px] border-[white/0.07] bg-[white/0.1] p-[24px] lg:max-w-[350px]"
                    style={{
                        boxShadow:
                            '0px 5px 10px 0px rgba(0, 0, 0, 0.05), 0px 15px 30px 0px rgba(0, 0, 0, 0.05), 0px 20px 40px 0px rgba(0, 0, 0, 0.05)',
                    }}
                >
                    <div className="text-[32px] font-semibold text-neutrals8">
                        {' '}
                        {Math.floor(apyInfo?.data?.apy) || 0}%
                    </div>
                    <div className="text-[14px] font-bold text-neutrals6">APY</div>
                </div>
                <div
                    className="flex h-[152px] w-full flex-col items-center gap-[24px] rounded-[16px] border-[1px] border-[white/0.07] bg-[white/0.1] p-[24px] lg:max-w-[350px]"
                    style={{
                        boxShadow:
                            '0px 5px 10px 0px rgba(0, 0, 0, 0.05), 0px 15px 30px 0px rgba(0, 0, 0, 0.05), 0px 20px 40px 0px rgba(0, 0, 0, 0.05)',
                    }}
                >
                    <div className="flex items-center gap-[4px] text-[32px] font-semibold text-neutrals8">
                        {' '}
                        {Math.floor(apyInfo?.data?.amount) || 0}
                        <Mask width={36} height={36} />
                    </div>
                    <div className="text-[14px] font-bold text-neutrals6">Total MASK Staked</div>
                </div>
            </div>
            <div className="mt-[24px] font-bold text-neutrals9">
                This is the first phase of the MASK staking event. You will be able to retrieve your staked Mask tokens
                and reward tokens only after the event concludes.
            </div>
            <MainButton
                className="mt-[24px] w-[255px] !text-neutrals1"
                onClick={() => {
                    setIsOpen(true);
                }}
                style={{
                    background: '#05050A',
                }}
            >
                <Mask width={24} height={24} />
                Stake MASK Now
                <RightArrow width={24} height={24} />
            </MainButton>
        </div>
    );
}
