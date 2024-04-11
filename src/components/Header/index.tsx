'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

import CloseIcon from "@/assets/close.svg"
import MoreIcon from "@/assets/more.svg"
import { ConnectWalletButton } from '@/components/Header/ConnectWalletButton.js';
import { ConnectXButton } from '@/components/Header/ConnectXButton.js';
import { NavTabs } from '@/components/Header/NavTabs.js';
import { NavTabsMobile } from '@/components/Header/NavTabsMobile.js';
import { Image } from '@/esm/Image.js';

export function Header() {
    const { data: session, status } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <header className={`fixed top-0 w-full items-center justify-between bg-black/10  pt-[48px] pb-[24px] px-[32px] lg:p-[20px] z-[99] flex 
        ${mobileMenuOpen ? " absolute w-full h-full flex-col !justify-start" : ""} `} style={{ backdropFilter: 'blur(10px)' }}>
            <div className="flex items-center w-full lg:w-auto">
                <div className="flex items-center justify-between gap-[32px] w-full">
                    <Image src="/logo.svg" alt="Logo" width={164} height={35} />
                    <div className="h-[35px] w-[1px] rounded-[1px] bg-black/10 hidden lg:flex" />
                    {mobileMenuOpen ? <CloseIcon className="cursor-pointer lg:hidden" onClick={() => setMobileMenuOpen(false)} width={32} height={32} /> : null}
                </div>
                <NavTabs />
            </div>
            {mobileMenuOpen ? <NavTabsMobile /> : null}
            <div className='hidden lg:flex'>
                {status === 'authenticated' ? < ConnectWalletButton /> : <ConnectXButton />}
            </div>
            {mobileMenuOpen ? null :
                <button className='flex lg:hidden' onClick={() => setMobileMenuOpen(true)} >
                    <MoreIcon width={32} height={32} />
                </button>}
        </header>
    );
}
