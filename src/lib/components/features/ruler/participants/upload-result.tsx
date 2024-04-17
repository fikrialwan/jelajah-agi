"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "~/lib/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/lib/components/ui/dialog";
import { Input } from "~/lib/components/ui/input";

interface IProps {
  typeResult: "file" | "link";
}

export default function UploadResult({ typeResult }: IProps) {
  return (
    <Dialog>
      <Button variant="default" className="w-24" asChild>
        <DialogTrigger>Upload hasil</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Upload hasil</DialogTitle>
          <form className="flex flex-col gap-2">
            {typeResult === "link" && (
              <fieldset className="flex flex-col items-start">
                <label>Link</label>
                <Input
                  placeholder="ex. https://www.instagram.com/astragemaislami/"
                  name="link"
                />
              </fieldset>
            )}

            {typeResult === "file" && (
              <fieldset className="flex flex-col items-start">
                <label>Image</label>
                <Input name="img" type="file" />
              </fieldset>
            )}

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
