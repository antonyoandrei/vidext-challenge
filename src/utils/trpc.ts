"use client";

import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/trpcRouter";

export const trpc = createTRPCReact<AppRouter>();
