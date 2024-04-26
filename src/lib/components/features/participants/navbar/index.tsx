"use client";

import {
  HomeIcon,
  ClockIcon,
  ScanBarcodeIcon,
  ListChecks,
  UserCircle,
} from "lucide-react";

import { useRouter, usePathname } from "next/navigation";

const NavbarParticipant = () => {
  const dataMenu = [
    {
      id: 0,
      href: "/",
      icon: <HomeIcon size={24} />,
    },
    {
      id: 0,
      href: "/clock",
      icon: <ClockIcon size={24} />,
    },
    {
      id: 0,
      href: "/participants/scan-qr",
      icon: <ScanBarcodeIcon size={24} />,
    },
    {
      id: 0,
      href: "/participants",
      icon: <ListChecks size={24} />,
    },
    {
      id: 0,
      href: "/profile",
      icon: <UserCircle size={24} />,
    },
  ];

  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav className="absoulute bottom-0 left-0 h-[50px] border-t border-t-primary shadow-sm w-full">
      <ul className="flex justify-between size-full">
        {dataMenu.map((menu) => {
          return (
            <li
              key={menu.id}
              onClick={() => router.push(menu.href)}
              className={`flex items-center justify-center size-full border-x border-x-primary ${
                pathname === menu.href
                  ? "bg-primary text-white"
                  : " bg-white text-primary"
              }`}
            >
              {menu.icon}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavbarParticipant;
