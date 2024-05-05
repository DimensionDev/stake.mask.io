'use client'

import { IS_TESTNET, POOL_ID } from '@/constants/index.js';
import { Image } from '@/esm/Image.js';
import { stakeAPI } from '@/providers/StakeAPI.js';
import { useQuery } from '@tanstack/react-query';
import { readContract } from 'wagmi/actions';
import { STAKE_MANAGER_CONTRACT } from '@/constants/index.js';
import { publicClient } from '@/configs/wagmiClient.js';
import { useMemo } from 'react';
import Mask from '@/assets/logos/mask.svg';
import RSS3 from '@/assets/logos/rss3.svg';
import Ton from '@/assets/logos/ton.svg';
import Add from '@/assets/add.svg';
import RightArrow from '@/assets/rightArrow.svg';
import { MainButton } from '../MainButton.js';
import { useStakeModalStore } from '@/store/useStakeModalStore.js';


const projectInfo = {
    symbol: 'SLN',
    name: 'SmartLayer.network',
    logo: '/sln.svg',
    color: 'var(--line-purple)',
};

export function ProjectDetailCard() {
    const { data: apyInfo } = useQuery({
        queryKey: ['poolinfo', 'apy'],
        queryFn: async () => {
            const res = stakeAPI.getPoolInfo(POOL_ID);
            return res
        }
    })
    const { data: poolInfo } = useQuery({
        queryKey: ['poolinfo'],
        queryFn: async () => {
            const res = await readContract({
                ...STAKE_MANAGER_CONTRACT, functionName: 'pools', args: [BigInt(POOL_ID)]
            });

            const startTimeStamp = await publicClient({ chainId: IS_TESTNET ? 11155111 : 1 }).getBlock({ blockNumber: res[0] })
            const endTimeStamp = Number((res[1] - res[0])) * 12 + Number(startTimeStamp.timestamp)
            return {
                startTime: new Date(Number(startTimeStamp.timestamp) * 1000),
                endTime: new Date(endTimeStamp * 1000),
            }
        }
    })

    const setIsOpen = useStakeModalStore((state) => state.setIsOpen)

    const statusText = useMemo(() => {
        if (!poolInfo) return 'Not started'
        const now = Date.now()
        if (now < poolInfo.startTime.getTime()) return 'Not started'
        if (now < poolInfo.endTime.getTime()) return 'Ongoing'
        return 'Ended'
    }, [poolInfo])

    return (
        <div className="z-40 flex w-full flex-col rounded-[12px] p-[24px] items-center" style={{ background: 'var(--line-purple)' }}>
            <div className="flex lg:items-center justify-between flex-col lg:flex-row w-full">
                <div>
                    <div className="flex gap-[10px]">
                        <div className=" text-[32px] lg:text-[48px] font-bold leading-[56px] text-neutrals9">Stake MASK</div>
                        <div className="flex h-[22px] items-center rounded-[4px] bg-neutrals9 px-[6px] text-[14px] font-bold text-linePurple">
                            <Image src="/no1.svg" width={29} height={14} alt="no.1" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center justify-center bg-neutrals9 text-[12px] font-semibold w-[80px] h-[20px] rounded-[6px] text-neutrals1">
                        {statusText}
                    </div>
                    <div className="text-[20px] leading-[28px] text-neutrals9 font-bold">Time: {poolInfo ? `${poolInfo.startTime.toLocaleDateString()} - ${poolInfo.endTime.toLocaleDateString()}` : ''}
                    </div>
                </div>
            </div>
            <div className='flex mt-[24px] gap-[24px] flex-col lg:flex-row w-full'>
                <div className='flex flex-col p-[24px] gap-[24px] border-[1px] border-[white/0.07] bg-[white/0.1] items-center lg:h-[152px] rounded-[16px] w-full lg:max-w-[450px]' style={{
                    boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.05), 0px 15px 30px 0px rgba(0, 0, 0, 0.05), 0px 20px 40px 0px rgba(0, 0, 0, 0.05)"
                }}>
                    <div className='flex gap-[4px] items-center flex-col lg:flex-row'>
                        <RSS3 width={48} height={48} />
                        <div className='flex flex-col'>
                            <div className='text-neutrals8 font-bold text-[24px]'>700,000</div>
                            <div className='text-neutrals8 font-bold text-[16px]'>RSS3</div>
                        </div>
                        <Add width={24} height={24} />
                        <Ton width={48} height={48} />
                        <div className='flex flex-col'>
                            <div className='text-neutrals8 font-bold text-[24px]'>20,000</div>
                            <div className='text-neutrals8 font-bold text-[16px]'>TON</div>
                        </div>
                    </div>
                    <div className='text-neutrals6 font-bold text-[14px]'>Total Rewards</div>
                </div>
                <div className='flex flex-col p-[24px] gap-[24px] border-[1px] border-[white/0.07] bg-[white/0.1] items-center h-[152px] rounded-[16px] w-full lg:max-w-[350px]' style={{
                    boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.05), 0px 15px 30px 0px rgba(0, 0, 0, 0.05), 0px 20px 40px 0px rgba(0, 0, 0, 0.05)"
                }}>
                    <div className='text-neutrals8 font-semibold text-[32px]'> {Math.floor(apyInfo?.data?.apy) || 0}%</div>
                    <div className='text-neutrals6 font-bold text-[14px]'>APY</div>
                </div>
                <div className='flex flex-col p-[24px] gap-[24px] border-[1px] border-[white/0.07] bg-[white/0.1] items-center h-[152px] rounded-[16px] w-full lg:max-w-[350px]' style={{
                    boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.05), 0px 15px 30px 0px rgba(0, 0, 0, 0.05), 0px 20px 40px 0px rgba(0, 0, 0, 0.05)"
                }}>
                    <div className='text-neutrals8 font-semibold text-[32px] flex gap-[4px] items-center'> {Math.floor(apyInfo?.data?.amount) || 0}<Mask width={36} height={36} /></div>
                    <div className='text-neutrals6 font-bold text-[14px]'>Total MASK Staked</div>
                </div>
            </div>
            <div className='mt-[24px] text-neutrals9 font-bold'>This is the first phase of the MASK staking event. You will be able to retrieve your staked Mask tokens and reward tokens only after the event concludes.</div>
            <MainButton className='mt-[24px] !text-neutrals1 w-[255px]' onClick={() => { setIsOpen(true) }} style={{
                background: '#05050A'
            }}>
                <Mask width={24} height={24} />
                Stake MASK Now
                <RightArrow width={24} height={24} />
            </MainButton>
        </div >
    );
}
