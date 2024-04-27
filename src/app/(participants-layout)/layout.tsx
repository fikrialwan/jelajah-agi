import NavbarParticipant from "~/lib/components/features/participants/navbar";

export default function RulerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen">
      <main className="h-[calc(100vh-50px)]">{children}</main>
      <NavbarParticipant />
    </div>
  );
}
