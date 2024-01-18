import { createTRPCRouter } from "../api/trpc";
import { prescribeRouter} from "./routers/precribes"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  prescribes: prescribeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
