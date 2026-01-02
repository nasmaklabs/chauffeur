import { createTRPCRouter } from "../trpc";
import { bookingRouter } from "./booking";
import { userRouter } from "./user";
import { contactRouter } from "./contact";

export const appRouter = createTRPCRouter({
  booking: bookingRouter,
  user: userRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
