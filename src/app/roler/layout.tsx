import RulerBottombar from "~/lib/components/features/ruler/layout/bottombar";
import RulerNavbar from "~/lib/components/features/ruler/layout/navbar";
import RulerSidebar from "~/lib/components/features/ruler/layout/sidebar";

function RulerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <RulerNavbar />
      <RulerSidebar />
      <main>{children}</main>
      <RulerBottombar />
    </div>
  );
}

export default RulerLayout;
