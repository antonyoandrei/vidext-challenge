// Configuración base del servidor TRPC
// Contexto incluye session, prisma y autorización.
// Aquí definimos el router raíz y un procedimiento sin middleware.
import { initTRPC } from "@trpc/server";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
