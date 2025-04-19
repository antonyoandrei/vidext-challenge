// Cliente tRPC para React Query
// — Usamos createTRPCReact tipado con AppRouter para llamadas tipo-safe desde el navegador.
"use client";

import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/trpcRouter";

export const trpc = createTRPCReact<AppRouter>();
