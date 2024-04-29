'use client';

import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';

import Metamask from '@/assets/logos/metamask.svg';
import ETH from '@/assets/logos/eth-black.svg';
import { Image } from '@/esm/Image.js';
import { formatAddress } from '@/helpers/formatAddress.js';
import { Popover } from '@mui/material';
import { WalletInfo } from './WalletInfo.js';
import { useState, useRef, useEffect } from 'react';

export function ConnectWalletButton() {
    const { openConnectModal } = useConnectModal();
    const { address, isConnected } = useAccount();
    const { data } = useBalance({ address, formatUnits: 'ether' });
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    return (
        <button
            ref={anchorRef}
            className=" flex items-center gap-[4px] rounded-[99px] p-[2px] pr-[12px] text-center text-[14px] font-normal leading-[22px] text-neutrals9"
            style={{ background: 'var(--line-purple)' }}
            onClick={() => {
                isConnected ? setOpen(!open) : openConnectModal && openConnectModal();
            }}
        >
            {isConnected ? (
                <>
                    <Metamask width={36} height={36} />
                    <div className="text-[14px] font-bold text-neutrals9">{formatAddress(address as string)}</div>
                    {data ? (
                        <div className="flex items-center justify-center gap-[8px] rounded-full bg-neutrals9 p-[4px] pl-[8px] text-right text-[14px] font-bold text-neutrals2">
                            {Number(data.formatted).toFixed(2)} <ETH width={26} height={26} />
                        </div>
                    ) : null}

                    <Popover
                        open={open}
                        anchorEl={anchorRef.current}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        className="mt-[10px] !rounded-[20px] bg-transparent"
                        style={{ backgroundColor: 'transparent' }}
                    >
                        <WalletInfo />
                    </Popover>
                </>
            ) : (
                <>
                    <div className={`flex rounded-[99px] p-[8px]`}>
                        <Image src="/wallet.svg" alt="Wallet" width={20} height={20} />
                    </div>
                    <div className="text-[14px] font-bold text-neutrals9">Connect your wallet</div>
                </>
            )}
        </button>
    );
}
