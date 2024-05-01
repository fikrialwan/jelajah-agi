import Link from "next/link";
import { cn } from "~/lib/styles/utils";
import SideNavLink from "./navlink";
import { HomeIcon, ListOrderedIcon } from "lucide-react";

export default function JudgeSidebar() {
  return (
    <aside
      className={cn(
        "bg-primary sticky top-0 h-screen py-4 px-6",
        "hidden",
        "md:flex md:min-w-56 flex-col gap-8"
      )}
    >
      <h1 className="text-primary-foreground font-bold text-2xl tracking-wider">
        <Link href="/">Jelajah Amaliah</Link>
      </h1>
      <nav>
        <ul className="flex flex-col gap-4">
          <SideNavLink isIndex href="/judge/" icon={<HomeIcon />}>
            Home
          </SideNavLink>
          <SideNavLink icon={<ListOrderedIcon />} href="/judge/leaderboard">
            Leaderboard
          </SideNavLink>
        </ul>
      </nav>
    </aside>
  );
}
