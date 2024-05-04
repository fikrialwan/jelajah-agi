import NavbarParticipant from "~/lib/components/features/participants/navbar";

export default function RulerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-screen">
      <main className="h-full pb-[50px]">{children}</main>
      <NavbarParticipant />
    </div>
  );
}
