import "./globals.css";
import { Providers } from "@/components/Providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <Toaster
        toastOptions={{
          style: {
            background: "var(--primary)",
            color: "var(--accent)",
            border: "1px solid var(--accent)",
          },
        }}
      />
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/favicon.ico" />
          <title>pAInt</title>
        </head>
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </TooltipProvider>
  );
}
