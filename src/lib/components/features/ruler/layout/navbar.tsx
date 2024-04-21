"use client";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { auth } from "~/lib/api/firebase";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/lib/components/ui/alert-dialog";
import { Button } from "~/lib/components/ui/button";
import { cn } from "~/lib/styles/utils";

export default function RulerNavbar() {
  const router = useRouter();
  const cookies = useCookies();

  async function handleLogout() {
    try {
      await signOut(auth);
      cookies.remove("role");
      cookies.remove("uid");
      router.replace("/login");
    } catch (_) {
      cookies.remove("role");
      cookies.remove("uid");
      router.replace("/login");
    }
  }

  return (
    <header
      className={cn(
        "bg-primary",
        "md:bg-transparent",
        "w-full py-3 px-5 flex flex-row justify-end items-center sticky top-0"
      )}
    >
      <h1
        className={cn(
          "text-primary-foreground",
          "md:hidden",
          "font-bold text-xl tracking-wide flex-1"
        )}
      >
        Jelajah AGI
      </h1>
      <AlertDialog>
        <Button
          variant="destructive"
          className={cn("hidden", "md:block")}
          asChild
        >
          <AlertDialogTrigger>Logout</AlertDialogTrigger>
        </Button>
        <AlertDialogTrigger
          className={cn("md:hidden", "text-primary-foreground")}
        >
          <LogOut size={18} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure want to logout?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button asChild variant="outline">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </Button>
            <Button asChild variant="destructive" className="mb-2 md:m-0">
              <AlertDialogAction onClick={handleLogout}>Yes</AlertDialogAction>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
