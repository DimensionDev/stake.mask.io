/* cspell:disable */

/** @type {import('next').NextConfig} */
const config = {
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    experimental: {
        esmExternals: true,
        scrollRestoration: true,
        swcPlugins: [['@lingui/swc-plugin', {}]],
    },
    images: {
        dangerouslyAllowSVG: false,
        unoptimized: process.env.NODE_ENV === 'development' ? true : false,
        remotePatterns: [
            {
                hostname: 'stake.mask.io',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)?', // Matches all pages
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                ],
            },
            {
                source: '/next-debug.log',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=0, must-revalidate',
                    },
                ],
            },
        ];
    },
    
};

export default config;