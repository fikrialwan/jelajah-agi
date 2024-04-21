"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { Button } from "~/lib/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/lib/components/ui/dialog";
import { Input } from "~/lib/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/lib/components/ui/select";

interface IProps {
  team: string;
}

export default function Score({ team }: IProps) {
  return (
    <Dialog>
      <Button variant="default" className="w-24 self-end" asChild>
        <DialogTrigger>Input Score</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Input score {team}</DialogTitle>
          <form className="flex flex-col gap-2">
            <fieldset className="flex flex-col items-start">
              <label>Score</label>
              <Input placeholder="ex. 10" type="number" name="score" />
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
