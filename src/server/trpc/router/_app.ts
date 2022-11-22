import { router } from "../trpc";
import { exampleRouter } from "./example";
import { jobRouter } from "./jobrouter";

export const appRouter = router({
  example: exampleRouter,
  jobs: jobRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
