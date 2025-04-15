import { z } from "zod";
import { publicProcedure, router } from "./trpcServer";

let documentStore: any = {};

export const appRouter = router({
  getDocument: publicProcedure.query(() => {
    return documentStore;
  }),
  saveDocument: publicProcedure.input(z.any()).mutation(({ input }) => {
    documentStore = input;
    return { success: true };
  }),
});

export type AppRouter = typeof appRouter;
