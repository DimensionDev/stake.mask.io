'use client';

/* cspell:disable */

import { Script } from '@/esm/Script.js';

export function GA() {
    return (
        <>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-8TBMFS8K72" />
            <Script id="ga">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-8TBMFS8K72');
                `}
            </Script>
        </>
    );
}
