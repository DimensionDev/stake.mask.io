import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                neutrals1: '#FCFCFD',
                neutrals2: '#F4F5F6',
                neutrals3: '#E6E8EC',
                neutrals4: '#B1B5C3',
                neutrals5: '#B1B5C3',
                neutrals6: '#353945',
                neutrals7: '#23262F',
                neutrals8: '#141414',
                neutrals9: '#05050A',
                lineGreen: 'linear-gradient(180deg,rgb(0, 229, 119) 0%,rgb(0, 229, 172) 100%)'
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};
export default config;
