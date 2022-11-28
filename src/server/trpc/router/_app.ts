import { router } from "../trpc";
import { jobRouter } from "./jobrouter";

export const appRouter = router({
  jobs: jobRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
