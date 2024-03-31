"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/styles/utils";

interface IProps {
  isIndex?: boolean;
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

export default function SideNavLink({ isIndex, href, children, icon }: IProps) {
  const pathname = usePathname();

  const isActive = (isIndex && pathname === "/ruler") || href === pathname;

  return (
    <li className="flex flex-row text-primary-foreground items-center justify-between">
      <Link href={href} className="flex-1 flex flex-row gap-2 items-center">
        {icon}
        {children}
      </Link>
      <div
        className={cn(
          "h-6 w-1 rounded-3xl",
          isActive ? "bg-primary-foreground" : "bg-primary"
        )}
      />
    </li>
  );
}
