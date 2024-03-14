'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';

import { WagmiProvider } from '@/components/WagmiProvider.js';
import { queryClient } from '@/configs/queryClient.js';

export function Providers(props: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <ReactQueryStreamedHydration>
                    <SnackbarProvider
                        maxSnack={30}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        autoHideDuration={3000}
                        classes={{
                            containerRoot: 'max-w-[400px]',
                        }}
                    >
                        {/* wagmi depends @tanstack/react-query@4.29.23 */}
                        <WagmiProvider>{props.children}</WagmiProvider>
                    </SnackbarProvider>
                </ReactQueryStreamedHydration>
            </SessionProvider>
            {process.env.NODE_ENV === 'development' ? <ReactQueryDevtools initialIsOpen={false} /> : null}
        </QueryClientProvider>
    );
}
