import RulerBottombar from "~/lib/components/features/ruler/layout/bottombar";
import RulerNavbar from "~/lib/components/features/ruler/layout/navbar";
import RulerSidebar from "~/lib/components/features/ruler/layout/sidebar";

export default function RulerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row bg-primary w-full">
      <RulerSidebar />
      <div className="h-screen w-full bg-background md:rounded-s-2xl">
        <RulerNavbar />
        <main>{children}</main>
        <RulerBottombar />
      </div>
    </div>
  );
}
