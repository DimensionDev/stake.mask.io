'use client'

import React from 'react';

import { Link } from '@/esm/Link.js';
import { usePathname } from 'next/navigation.js';


const navigation = [
  { name: 'Stake', path: '/stake' },
  { name: 'FAQs', path: '/faqs' },
  { name: 'About', path: '/about' },
];

export function NavTabsMobile() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col self-start absolute gap-[36px] mt-[128px] lg:hidden" aria-label="Global">
      {navigation.map((item) => (
        <div className='flex gap-[30px] h-[64px] items-center'>
          <div className={`h-full w-[2px]`} style={{ background: pathname === item.path ? "var(--line-green)" : "transparent" }} />
          <Link
            className={`text-[24px] font-normal leading-[16px] ${pathname === item.path ? "text-neutrals1" : "text-neutrals5"} transition-colors duration-200 hover:text-neutrals1`}
            key={item.path}
            href={item.path}
          >
            <span>{item.name}</span>
          </Link>
        </div>
      ))}
    </nav>
  );
}
