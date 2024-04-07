'use client';

import { useSession } from 'next-auth/react';

import { ConnectWalletButton } from '@/components/Header/ConnectWalletButton.js';
import { ConnectXButton } from '@/components/Header/ConnectXButton.js';
import { NavTabs } from '@/components/Header/NavTabs.js';
import { Image } from '@/esm/Image.js';
import { useAccount } from 'wagmi';
import MoreIcon from '@/assets/more.svg';

export function Header() {
    const { data: session, status } = useSession();
    const { address, isConnected } = useAccount();

    return (
        <header className="fixed top-0 z-[999] flex w-full items-center justify-between bg-black/10 px-[32px] pb-[24px] pt-[48px] lg:p-[20px]">
            <div className="flex items-center">
                <div className="flex items-center justify-between gap-[32px]">
                    <Image src="/logo.svg" alt="Logo" width={164} height={35} />
                    <div className="hidden h-[35px] w-[1px] rounded-[1px] bg-black/10 lg:flex" />
                </div>
                <NavTabs />
            </div>
            <div className="hidden lg:flex">
                {status === 'authenticated' ? <ConnectWalletButton /> : <ConnectXButton />}
            </div>
            <div className="flex lg:hidden">
                <MoreIcon width={32} height={32} />
            </div>
        </header>
    );
}
