import { createTRPCRouter } from '../trpc';
import { bookingRouter } from './booking';
import { userRouter } from './user';

export const appRouter = createTRPCRouter({
    booking: bookingRouter,
    user: userRouter,
});

export type AppRouter = typeof appRouter;

