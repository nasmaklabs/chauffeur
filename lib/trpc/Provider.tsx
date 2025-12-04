'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { trpc } from './client';
import superjson from 'superjson';

function getBaseUrl() {
    // Browser should use relative URL
    if (typeof window !== 'undefined') {
        return '';
    }
    
    // SSR should use production URL or localhost
    if (process.env.NEXT_PUBLIC_APP_URL) {
        return process.env.NEXT_PUBLIC_APP_URL;
    }
    
    // Reference for Netlify deployment
    if (process.env.NETLIFY) {
        return `https://${process.env.DEPLOY_URL || process.env.URL}`;
    }
    
    // Assume localhost
    return 'http://localhost:3000';
}

export default function TRPCProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 1000,
            },
        },
    }));

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                    transformer: superjson,
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}

