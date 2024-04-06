import Link from "next/link";
import { cn } from "~/lib/styles/utils";
import BottomNavLink from "./navlink";
import { Store, User } from "lucide-react";

export default function RulerBottombar() {
  return (
    <nav
      className={cn(
        "md:hidden",
        "fixed bottom-0 z-10 w-full bg-white shadow-md h-14 py-3 px-5"
      )}
    >
      <ul className="flex flex-row gap-3 h-full">
        <BottomNavLink isIndex href="/ruler/booth">
          <Store />
        </BottomNavLink>
        <BottomNavLink href="/ruler/user">
          <User />
        </BottomNavLink>
      </ul>
    </nav>
  );
}
