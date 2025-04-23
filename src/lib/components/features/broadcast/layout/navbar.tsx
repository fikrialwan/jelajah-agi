"use client";

import React, { useEffect, useState } from "react";
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
  const [isHide, setIsHide] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

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

  useEffect(() => {
    const addCount = () => setInteractionCount((prev) => prev + 1);
    document.addEventListener("scroll", addCount);
    document.addEventListener("mousemove", addCount);
    document.addEventListener("touchmove", addCount);

    return () => {
      document.removeEventListener("scroll", addCount);
      document.removeEventListener("mousemove", addCount);
      document.removeEventListener("touchmove", addCount);
    };
  }, []);

  useEffect(() => {
    setIsHide(false);
    const hideNavbar = setTimeout(() => {
      setIsHide(true);
    }, 1500);

    return () => {
      clearTimeout(hideNavbar);
    };
  }, [interactionCount]);

  return (
    <header
      className={cn(
        "bg-primary",
        "w-full py-3 flex px-5 flex-row justify-end items-center sticky top-0"
      )}
    >
      {!isHide && <LogOut size={18} className="opacity-0" />}
      <h1
        className={cn(
          "text-primary-foreground text-center",
          "font-bold text-xl tracking-wide flex-1"
        )}
      >
        Jelajah Amaliah
      </h1>
      <AlertDialog>
        {!isHide && (
          <AlertDialogTrigger className={cn("text-primary-foreground")}>
            <LogOut size={18} />
          </AlertDialogTrigger>
        )}
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
