import RulerNavbar from "~/lib/components/features/ruler/layout/navbar";

export default function JudgeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <RulerNavbar />
      <div className="container pt-8">{children}</div>
    </>
  );
}
