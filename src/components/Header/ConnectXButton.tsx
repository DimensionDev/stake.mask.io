'use client';

import { signIn, useSession } from 'next-auth/react';

import { Account } from '@/components/Header/Account.js';
import { Image } from '@/esm/Image.js';

export function ConnectXButton() {
    const { data: session, status } = useSession();

    return status === 'authenticated' ? (
        <Account />
    ) : (
        <button
            className=" flex items-center gap-[4px] rounded-lg px-[24px] py-[12px] text-center text-[14px] font-normal leading-[16px] text-neutrals9"
            style={{ background: 'var(--line-purple)' }}
            onClick={() => {
                signIn('twitter');
            }}
        >
            <Image src="/x.svg" alt="x logo" width={16} height={16} />
            Connect with X
        </button>
    );
}
