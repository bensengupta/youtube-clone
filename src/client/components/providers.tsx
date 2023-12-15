"use client";

import { api, trpcCreateClientOptions } from "@/src/client/utils/trpc-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { useState } from "react";

function TrpcProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } },
      })
  );

  const [trpcClient] = useState(() =>
    api.createClient(trpcCreateClientOptions)
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </api.Provider>
  );
}

function AuthProvider({ children }: React.PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}

function ThemeProvider({ children }: React.PropsWithChildren) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <AuthProvider>
      <TrpcProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </TrpcProvider>
    </AuthProvider>
  );
}
