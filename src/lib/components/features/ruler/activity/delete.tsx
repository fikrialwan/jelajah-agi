"use client";

import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/lib/components/ui/alert-dialog";
import { Button } from "~/lib/components/ui/button";
import { useRef } from "react";
import { useToast } from "~/lib/components/ui/use-toast";
import { ref, remove } from "firebase/database";
import { db } from "~/lib/api/firebase";

interface IProps {
  uid: string;
}

export default function ParticipantDelete({ uid }: IProps) {
  const { toast } = useToast();
  const buttonCloseRef = useRef<HTMLButtonElement>(null);

  async function actionDelete() {
    remove(ref(db, `activity/${uid}`));
    toast({
      variant: "success",
      title: "Success",
      description: "Delete successfully",
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger aria-label="DeleteButton">
        <Trash className="text-destructive" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            activity and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button asChild variant="outline">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </Button>
          <Button
            variant="destructive"
            className="mb-2 md:m-0"
            onClick={actionDelete}
          >
            Yes
          </Button>
          <AlertDialogAction ref={buttonCloseRef} className="hidden" />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
