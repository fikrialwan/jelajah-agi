import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Toaster } from "~/lib/components/ui/toaster";
import AtomProvider from "~/lib/providers/atom-provider";
import ReactQueryProvider from "~/lib/providers/react-query-provider";
import { fontJakarta } from "~/lib/styles/font";
import "~/lib/styles/globals.css";

export const metadata: Metadata = {
  title: "Jelajah Amaliah",
  description: "Jelajah Amaliah Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontJakarta.variable} h-screen`}>
        <CookiesProvider>
          <ReactQueryProvider>
            <AtomProvider>{children}</AtomProvider>
            <Toaster />
          </ReactQueryProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
