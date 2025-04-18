import { publicProcedure, router } from "./trpcServer";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

  generateImage: publicProcedure
    .input(z.object({ prompt: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: input.prompt,
        n: 1,
        quality: "hd",
        size: "1024x1024",
      });
      return { url: response.data[0].url };
    }),
});

export type AppRouter = typeof appRouter;
