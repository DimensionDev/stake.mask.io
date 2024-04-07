'use client';

import { Image } from '@/esm/Image.js';
import { useConnectModal, useAccountModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { formatAddress } from '@/helpers/formatAddress.js';
import Metamask from '@/assets/logos/metamask.svg';

export function ConnectWalletButton() {
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { address, isConnected } = useAccount();

    return (
        <button
            className=" flex items-center gap-[4px] rounded-[99px] p-[2px] pr-[12px] text-center text-[14px] font-normal leading-[22px] text-neutrals9"
            style={{ background: 'var(--line-green)' }}
            onClick={() => {
                if (!openAccountModal || !openConnectModal) return;
                isConnected ? openAccountModal() : openConnectModal();
            }}
        >
            {' '}
            {isConnected ? (
                <>
                    <Metamask width={36} height={36} />
                    {formatAddress(address as string)}
                </>
            ) : (
                <>
                    <div className={`flex rounded-[99px] bg-neutrals9 p-[8px]`}>
                        <Image src="/wallet.svg" alt="Wallet" width={20} height={20} />
                    </div>
                    Connect your wallet
                </>
            )}
        </button>
    );
}
