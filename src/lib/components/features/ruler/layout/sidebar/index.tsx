import Link from "next/link";
import { cn } from "~/lib/styles/utils";
import SideNavLink from "./navlink";
import {
  Store,
  User,
  Clock,
  UserCheck,
  ListOrderedIcon,
  Tally5Icon,
} from "lucide-react";

export default function RulerSidebar() {
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
          <SideNavLink isIndex href="/ruler/booth" icon={<Store />}>
            Booth
          </SideNavLink>
          <SideNavLink icon={<UserCheck />} href="/ruler/judge">
            Judge
          </SideNavLink>
          <SideNavLink icon={<User />} href="/ruler/participant">
            Participant
          </SideNavLink>
          <SideNavLink icon={<Clock />} href="/ruler/countdown">
            Countdown
          </SideNavLink>
          <SideNavLink icon={<ListOrderedIcon />} href="/ruler/leaderboard">
            Leaderboard
          </SideNavLink>
          <SideNavLink icon={<Tally5Icon />} href="/ruler/activity">
            Activity
          </SideNavLink>
        </ul>
      </nav>
    </aside>
  );
}
