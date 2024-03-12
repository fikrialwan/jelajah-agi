import type { Metadata } from "next";
import ReactQueryProvider from "~/lib/providers/react-query-provider";
import { fontJakarta } from "~/lib/styles/font";
import "~/lib/styles/globals.css";

export const metadata: Metadata = {
  title: "Jelajah AGI",
  description: "Jelajah AGI Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontJakarta.variable}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
