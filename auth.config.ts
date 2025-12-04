import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    secret: process.env.AUTH_SECRET || 'development-secret-please-change-in-production',
    trustHost: true,
    basePath: '/api/auth',
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');
            const isOnLogin = nextUrl.pathname.startsWith('/admin/login');

            if (isOnAdmin) {
                if (isOnLogin) {
                    if (isLoggedIn) return Response.redirect(new URL('/admin', nextUrl));
                    return true;
                }
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
    debug: process.env.NODE_ENV === 'development',
} satisfies NextAuthConfig;

