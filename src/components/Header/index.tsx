'use client';

import { useSession } from 'next-auth/react';

import { ConnectWalletButton } from '@/components/Header/ConnectWalletButton.js';
import { ConnectXButton } from '@/components/Header/ConnectXButton.js';
import { NavTabs } from '@/components/Header/NavTabs.js';
import { Image } from '@/esm/Image.js';

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="fixed top-0 flex w-full items-center justify-between bg-black/10 lg:p-[20px]">
      <div className="flex items-center">
        <div className="flex items-center justify-between gap-[32px]">
          <Image src="/logo.svg" alt="Logo" width={100} height={100} />
          <div className="rounded-[1px] h-full w-[1px] bg-black/10" />
        </div>
        <NavTabs />
      </div>
      {status === 'authenticated' ? null : <ConnectXButton />}
      {status === 'authenticated' ? <ConnectWalletButton /> : null}
    </header>
  );
}
