import { publicProcedure, router } from "./trpcServer";
import { z } from "zod";
import { openai } from "./openaiClient";

// Estado en memoria para el snapshot del documento
let storedSnapshot = {};

export const appRouter = router({
  /**
   * - Recupera el snapshot actual
   */
  getDocument: publicProcedure.query(() => storedSnapshot),

  /**
   * - Actualiza el snapshot con validación genérica
   */
  saveDocument: publicProcedure
    .input(z.record(z.any()))
    .mutation(({ input }) => {
      storedSnapshot = input;
      return { success: true };
    }),

  /**
   * - Genera imagen con DALL·E 3 según prompt de usuario
   */
  generateImage: publicProcedure
    .input(z.object({ prompt: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: input.prompt,
        quality: "hd",
        size: "1024x1024",
      });
      return { url: response.data[0].url };
    }),
});

export type AppRouter = typeof appRouter;
