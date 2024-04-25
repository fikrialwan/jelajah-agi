"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { PencilIcon } from "lucide-react";
import { Button } from "~/lib/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/lib/components/ui/dialog";
import { Input } from "~/lib/components/ui/input";

export default function JudgeUpdate() {
  return (
    <Dialog>
      <DialogTrigger aria-label="EditButton">
        <PencilIcon className="text-primary" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Update Judge</DialogTitle>
          <form className="flex flex-col gap-2">
            <fieldset className="flex flex-col items-start">
              <label>Name</label>
              <Input placeholder="ex. Fikri Alwan" name="name" />
            </fieldset>
            <fieldset className="flex flex-col items-start">
              <label>Password</label>
              <Input placeholder="********" type="password" name="password" />
            </fieldset>
            <DialogClose asChild>
              <Button type="button" className="mt-2" variant="default">
                Save
              </Button>
            </DialogClose>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
