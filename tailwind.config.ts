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
                secondary3: '#FFD166',
                primary3: '#EB2F45',
                primary4: '#45B26B',
                blueBg: '#C2E6FF',
                linePurple: 'linear-gradient(261deg, #D0D0FF 3.1%, #A996F7 33.87%, #7280FE 54.26%, #D3D6FE 104.35%)',
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
