"use client"

import { Staker } from '@/components/StakeRanking/Staker.js';
import { TopStaker } from '@/components/StakeRanking/TopStaker.js';
import { POOL_ID } from '@/constants/index.js';
import { Image } from '@/esm/Image.js';
import { formatAddress } from '@/helpers/formatAddress.js';
import { stakeAPI } from '@/providers/StakeAPI.js';
import { useQuery } from '@tanstack/react-query';

export function StakeRanking() {
    const { data: rankingList } = useQuery({
        queryKey: ['ranking', POOL_ID],
        queryFn: async () => {
            const res = await stakeAPI.getRankingList(POOL_ID);
            return res.data.list;
        },
    });
    return (
        <div className="relative flex w-full flex-col rounded-[16px] border-[1px] border-neutrals6 p-[16px]">
            <Image
                src="/rankingLeft-lg.png"
                width={610}
                height={400}
                alt="left"
                className="absolute left-[-50px] top-[-50px] z-0 hidden lg:block"
            />
            <Image
                src="/rankingRight-lg.png"
                width={280}
                height={400}
                alt="right"
                className="absolute right-[-35px] top-[-30px] z-0 hidden lg:block"
            />
            <div
                className="absolute top-0 z-50 h-full w-full"
                style={{
                    background: 'linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0) 50%,rgba(0,0,0,0) 75%, rgba(0,0,0,1) )',
                }}
            />
            <div className="z-10 text-[24px] font-bold text-neutrals2">Staking Ranking</div>
            <div className="z-10 mt-[64px] flex w-full items-center justify-center">
                {rankingList?.length &&
                    <TopStaker
                        avatar={rankingList[0]?.twitter_image || '/maskAvatar.svg'}
                        name={rankingList[0]?.twitter_display_name || formatAddress(rankingList[0].address)}
                        amount={Number(rankingList[0]?.stake_amount) || 0}
                    />}
            </div>
            <div className="mt-[28px] grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-[28px]">
                {rankingList?.slice(1).map((item, index) => (
                    <Staker
                        key={index + 1}
                        avatar={item.twitter_image || '/maskAvatar.svg'}
                        name={item.twitter_display_name || formatAddress(item.address)}
                        amount={Number(item.stake_amount) || 0}
                    />
                ))}
            </div>
        </div>
    );
}
