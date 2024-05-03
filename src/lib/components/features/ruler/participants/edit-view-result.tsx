"use client";

import { useState, useEffect } from "react";
import { Button } from "~/lib/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/lib/components/ui/dialog";
import { DialogEditActivity } from "~/lib/stores/app.atom";
import { useAtom } from "jotai";
import Image from "next/image";

export default function EditViewResult() {
  const [open, setOpen] = useAtom(DialogEditActivity);

  return (
    <Dialog open={open !== null ? true : false}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Activity Booth</DialogTitle>
          <form className="flex flex-col gap-2">
            {open?.typeResult === "file" ? (
              <div className="flex justify-center">
                <div className="w-[75%] aspect-square relative ">
                  <Image src={open.result} fill alt="activity" />
                </div>
              </div>
            ) : (
              <div>
                <a href={open?.result}>Link</a>
              </div>
            )}

            <Button
              type="button"
              className="mt-2"
              variant="secondary"
              onClick={() => {
                setOpen(null);
              }}
            >
              Close
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
