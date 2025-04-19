/**
 * API handler tRPC para Next.js
 * - Mapea GET/POST en /api/trpc a nuestro appRouter
 * - Crea el contexto por petición
 */
import { appRouter } from "@/server/trpcRouter";
import { createContext } from "@/server/context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export const runtime = "edge"; // Usamos Edge Runtime para mejor rendimiento

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });

export { handler as GET, handler as POST };
