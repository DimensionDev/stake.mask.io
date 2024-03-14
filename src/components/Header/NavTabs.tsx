import React from 'react';

import { Link } from '@/esm/Link.js';

const navigation = [
    { name: 'Stake', path: '/stake' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'About', path: '/about' },
];

export interface NavigationHeaderProps {}

export function NavTabs() {
    return (
        <nav className="full flex items-center gap-[36px]" aria-label="Global">
            {navigation.map((item) => (
                <Link
                    className={`text-[14px] font-normal leading-[16px] text-neutrals5 transition-colors duration-200 hover:text-neutrals1`}
                    key={item.path}
                    href={item.path}
                >
                    <span>{item.name}</span>
                </Link>
            ))}
        </nav>
    );
}
