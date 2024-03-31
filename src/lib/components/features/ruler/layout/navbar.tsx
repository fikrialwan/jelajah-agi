"use client";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { LogOut } from "lucide-react";
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
  return (
    <header
      className={cn(
        "bg-primary",
        "md:bg-transparent",
        "w-full py-3 px-5 flex flex-row justify-end items-center"
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
              <AlertDialogAction>Yes</AlertDialogAction>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
