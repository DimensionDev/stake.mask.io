declare namespace NodeJS {
    interface ProcessEnv {
        TWITTER_CLIENT_ID: string;
        TWITTER_CLIENT_SECRET: string;

        NEXTAUTH_URL: string;
        NEXTAUTH_SECRET: string;

        NEXT_PUBLIC_W3M_PROJECT_ID: string;
        NEXT_PUBLIC_VERCEL_ENV: 'production' | 'preview' | 'development';

        NEXT_PUBLIC_SITE_URL?: string;
    }
}
