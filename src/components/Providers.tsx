// Configura React Query y tRPC Provider para toda la app
"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { httpBatchLink } from "@trpc/client";

export function Providers({ children }: { children: ReactNode }) {
  // Cliente de React Query único para todo el ciclo de vida
  const [queryClient] = useState(() => new QueryClient());
  // Cliente tRPC configurado con enlace a la API
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: "/api/trpc" })],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
