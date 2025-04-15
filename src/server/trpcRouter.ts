import { publicProcedure, router } from "./trpcServer";
import { z } from "zod";

let storedSnapshot = {};

export const appRouter = router({
  getDocument: publicProcedure.query(() => {
    return storedSnapshot;
  }),

  saveDocument: publicProcedure
    .input(z.record(z.any()))
    .mutation(({ input }) => {
      storedSnapshot = input;
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
