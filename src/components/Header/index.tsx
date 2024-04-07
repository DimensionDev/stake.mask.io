'use client';

import { useSession } from 'next-auth/react';

import { ConnectWalletButton } from '@/components/Header/ConnectWalletButton.js';
import { ConnectXButton } from '@/components/Header/ConnectXButton.js';
import { NavTabs } from '@/components/Header/NavTabs.js';
import { Image } from '@/esm/Image.js';
import MoreIcon from "@/assets/more.svg"

export function Header() {
    const { data: session, status } = useSession();

    return (
        <header className="fixed top-0 w-full items-center justify-between bg-black/10 pt-[48px] pb-[24px] px-[32px] lg:p-[20px] z-[999] flex">
            <div className="flex items-center">
                <div className="flex items-center justify-between gap-[32px]">
                    <Image src="/logo.svg" alt="Logo" width={164} height={35} />
                    <div className="h-[35px] w-[1px] rounded-[1px] bg-black/10 hidden lg:flex" />
                </div>
                <NavTabs />
            </div>
            <div className='hidden lg:flex'>
                {status === 'authenticated' ? < ConnectWalletButton /> : <ConnectXButton />}
            </div>
            <div className='flex lg:hidden'>
                <MoreIcon width={32} height={32} />
            </div>
        </header>
    );
}
