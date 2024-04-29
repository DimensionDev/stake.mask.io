'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { stakeAPI } from '@/providers/StakeAPI.js';
import { formatAddress } from '@/helpers/formatAddress.js';
import { Image } from '@/esm/Image.js';

export function ProfileCard() {
    const { address } = useAccount();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await stakeAPI.getUserInfo(address as string, '1');
            return data;
        },
    });
    console.log(data);
    return (
        <div className="relative flex w-full flex-col">
            <div className="h-[50px]" />
            <div
                className="absolute top-[50px] z-10 h-[100px] w-full"
                style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)' }}
            />
            <div className="absolute flex items-start gap-[12px]">
                <div className="flex items-center gap-[8px]">
                    <div className="relative h-[64px] w-[64px] rounded-[99px] border-[2px] border-white">
                        <Image
                            src={data?.twitter_image ? data?.twitter_image : '/mask-network.svg'}
                            alt="avatar"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="-mt-[30px] text-[32px] font-bold leading-[40px] text-white">
                        {data?.twitter_display_name
                            ? data.twitter_display_name
                            : address && formatAddress(address as string)}
                    </div>
                </div>
            </div>
            <div
                className="flex h-[100px] flex-col items-end justify-end rounded-[16px] p-[16px]"
                style={{ background: 'var(--line-purple)' }}
            >
                <div className="z-50 flex flex-col">
                    <div className="text-[32px] text-white">{data?.score}</div>
                    <div className="text-[16px] text-white/50">TOTAL POINTS</div>
                </div>
            </div>
        </div>
    );
}
