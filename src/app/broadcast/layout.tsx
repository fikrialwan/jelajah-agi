import BroadcastNavbar from "~/lib/components/features/broadcast/layout/navbar";

export default function BroadcastLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-h-screen h-screen bg-background flex flex-col">
      <BroadcastNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
