'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import { formatEther, parseEther } from 'viem';
import { useAccount } from 'wagmi';
import { readContract, waitForTransaction,writeContract  } from 'wagmi/actions';

import { InputPanel } from '@/components/StakeModal/StakeTokenInput/InputPanel.js';
import { publicClient } from '@/configs/wagmiClient.js';
import { IS_TESTNET, MASK_TOKEN_CONTRACT, POOL_ID, STAKE_MANAGER_CONTRACT } from '@/constants/index.js';
import { stakeAPI } from '@/providers/StakeAPI.js';

export function Stake() {
    const [amount, setAmount] = useState('');
    const { address } = useAccount();
    const [allowanceSet, setAllowanceSet] = useState(BigInt(0));

    const { data: allowanceFetch } = useSuspenseQuery({
        queryKey: ['allowance'],
        queryFn: async () => {
            if (!address) return BigInt(0);
            const res = await readContract({
                ...MASK_TOKEN_CONTRACT,
                functionName: 'allowance',
                args: [address, STAKE_MANAGER_CONTRACT.address],
            });
            return res;
        },
    });

    const { data: balance } = useQuery({
        queryKey: ['balance'],
        queryFn: async () => {
            if (!address) return '0';
            const res = await readContract({
                ...MASK_TOKEN_CONTRACT,
                functionName: 'balanceOf',
                args: [address],
            });
            return Number(formatEther(res as bigint)).toFixed(2);
        },
    });

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

    const allowance = allowanceFetch || allowanceSet;
    console.log('allowance', allowance, parseEther(amount));
    return (
        <>
            <InputPanel amount={amount} setAmount={setAmount} balance={balance} />
            {/* <SelectLockTime setLockTime={setLockTime} lockTime={lockTime} /> */}
            <div className="flex items-center justify-between text-[16px] text-neutrals4">
                <div>Unlock MASK Time</div>
                <div className="font-bold text-secondary3">
                    {poolInfo ? dayjs(poolInfo.endTime).format('HH:MM MM/DD/YYYY') : null}
                </div>
            </div>
            <div className="flex items-center justify-between text-[16px] text-neutrals4">
                <div>APY</div>
                <div className="font-bold"> {Math.floor(apyInfo?.data?.apy) || 0}%</div>
            </div>
            {/*           
            <div className="flex items-center justify-between text-[16px] text-neutrals4 ">
                <div>Display X accounts in the staking leaderboard</div>
                <Switch checked={showX} onChange={setShowX}>
                    {({ checked }) => (
                        <button
                            className={`${checked ? 'bg-primary4' : 'bg-neutrals4'
                                } relative inline-flex w-[64px] items-center rounded-[32px] p-[4px]`}
                        >
                            <span
                                className={`${checked ? 'translate-x-8' : 'translate-x-0'
                                    } inline-block h-[24px] w-[24px] transform rounded-full bg-neutrals8 transition`}
                            />
                        </button>
                    )}
                </Switch>
            </div> */}
            <div className="text-[16px] text-primary3">
                MASK Staking is exclusively open to individual users (excluding users listed in the{' '}
                <span className="underline">blacklist</span>). Organizations, companies, or institutions are not allowed
                to participate. <span className="underline">More</span>
            </div>
            <button
                style={{ background: 'var(--line-purple)' }}
                disabled={!amount}
                className={`flex w-full items-center justify-center rounded-[90px] py-[16px] text-[16px] font-bold text-neutrals8 ${amount ? '' : 'opacity-50'}`}
                onClick={async () => {
                    if (allowance < parseEther(amount)) {
                        const txHash = await writeContract({
                            ...MASK_TOKEN_CONTRACT,
                            functionName: 'approve',
                            args: [STAKE_MANAGER_CONTRACT.address, parseEther(amount)],
                        });
                        console.log('txHash', txHash);
                        await waitForTransaction({ hash: txHash.hash, chainId: IS_TESTNET ? 11155111 : 1 });
                        setAllowanceSet(parseEther(amount));
                    }
                    writeContract({
                        ...STAKE_MANAGER_CONTRACT,
                        functionName: 'depositAndLock',
                        args: [parseEther(amount)],
                    });
                }}
            >
                {amount ? (allowance && allowance >= parseEther(amount) ? 'Stake' : 'Approve') : 'Enter amount'}
            </button>
        </>
    );
}
