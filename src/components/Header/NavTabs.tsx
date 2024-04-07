'use client'

import React from 'react';

import { Link } from '@/esm/Link.js';
import { usePathname } from 'next/navigation.js';


const navigation = [
    { name: 'Stake', path: '/stake' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'About', path: '/about' },
];

export interface NavigationHeaderProps { }

export function NavTabs() {
    const pathname = usePathname();
    return (
        <nav className="full items-center gap-[36px] hidden lg:flex" aria-label="Global">
            {navigation.map((item) => (
                <div className='flex flex-col gap-[1px]'>
                    <Link
                        className={`text-[14px] font-normal leading-[16px] ${pathname === item.path ? "text-neutrals1" : "text-neutrals5"} transition-colors duration-200 hover:text-neutrals1`}
                        key={item.path}
                        href={item.path}
                    >
                        <span>{item.name}</span>
                    </Link>
                    <div className={`w-full h-[2px] ${pathname === item.path ? "flex" : "hidden"} `} style={{ background: "var(--line-green)" }} />
                </div>
            ))}
        </nav>
    );
}
