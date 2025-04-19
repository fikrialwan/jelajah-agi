"use client";

import React from "react";
import { Button } from "../../../ui/button";
import { cn } from "~/lib/styles/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../ui/alert-dialog";
import { LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "~/lib/api/firebase";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

export default function BroadcastNavbar() {
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
        "w-full py-3 px-5 flex flex-row justify-end items-center sticky top-0"
      )}
    >
      <h1
        className={cn(
          "text-primary-foreground",
          "font-bold text-xl tracking-wide flex-1"
        )}
      >
        Jelajah Amaliah
      </h1>
      <AlertDialog>
        <AlertDialogTrigger className={cn("text-primary-foreground")}>
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
