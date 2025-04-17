import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      <html lang="en">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </>
  );
}
