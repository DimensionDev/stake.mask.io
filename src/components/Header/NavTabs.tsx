'use client';

import { usePathname } from 'next/navigation.js';
import React from 'react';

import { Link } from '@/esm/Link.js';

const navigation = [
    { name: 'Stake', path: '/stake' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'About', path: '/about' },
];

export interface NavigationHeaderProps {}

export function NavTabs() {
    const pathname = usePathname();
    return (
        <nav className="full hidden items-center gap-[36px] lg:flex" aria-label="Global">
            {navigation.map((item) => (
                <div className="flex flex-col gap-[1px]">
                    <Link
                        className={`text-[14px] font-normal leading-[16px] ${pathname === item.path ? 'text-neutrals1' : 'text-neutrals5'} transition-colors duration-200 hover:text-neutrals1`}
                        key={item.path}
                        href={item.path}
                    >
                        <span>{item.name}</span>
                    </Link>
                    <div
                        className={`h-[2px] w-full ${pathname === item.path ? 'flex' : 'hidden'} `}
                        style={{ background: 'var(--line-green)' }}
                    />
                </div>
            ))}
        </nav>
    );
}
