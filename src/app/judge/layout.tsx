import JudgeBottombar from "~/lib/components/features/judge/layout/bottombar";
import JudgeNavbar from "~/lib/components/features/judge/layout/navbar";
import JudgeSidebar from "~/lib/components/features/judge/layout/sidebar";

export default function JudgeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row bg-primary w-full">
      <JudgeSidebar />
      <div className="max-h-screen h-screen overflow-auto w-full bg-background md:rounded-s-2xl flex flex-col">
        <JudgeNavbar />
        <main className="h-full pb-14 md:pb-0 overflow-auto">{children}</main>
        <JudgeBottombar />
      </div>
    </div>
  );
}
