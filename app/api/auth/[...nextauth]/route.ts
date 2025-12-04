import { handlers } from '@/auth';

// Export the handlers directly - CORS is now handled by proxy.ts
export const { GET, POST } = handlers;

