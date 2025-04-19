import BroadcastNavbar from "~/lib/components/features/broadcast/layout/navbar";

export default function BroadcastLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-h-screen h-screen bg-background overflow-auto  ">
      <BroadcastNavbar />
      <main className="h-full pb-14 md:pb-0 overflow-auto">{children}</main>
    </div>
  );
}
