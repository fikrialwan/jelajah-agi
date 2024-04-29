"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/styles/utils";

interface IProps {
  isIndex?: boolean;
  href: string;
  children: React.ReactNode;
}

export default function BottomNavLink({ isIndex, href, children }: IProps) {
  const pathname = usePathname();

  const isActive = (isIndex && pathname === "/ruler") || href === pathname;

  return (
    <li
      className={cn(
        isActive ? "text-primary" : "text-foreground",
        "flex-1 h-full"
      )}
    >
      <Link href={href} className="flex items-center justify-center h-full">
        {children}
      </Link>
    </li>
  );
}
