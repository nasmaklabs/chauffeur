import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

// Optimized Prisma initialization for serverless environments (Netlify, Vercel)
export const prisma = global.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// Ensure connection is closed on serverless function completion
if (process.env.NODE_ENV === 'production') {
    // Add cleanup for serverless
    process.on('beforeExit', async () => {
        await prisma.$disconnect();
    });
}

