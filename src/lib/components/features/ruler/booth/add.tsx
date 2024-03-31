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

export default function BoothAdd() {
  return (
    <Dialog>
      <Button variant="default" className="w-24 self-end" asChild>
        <DialogTrigger>
          <Plus /> Add
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Add booth</DialogTitle>
          <form className="flex flex-col gap-2">
            <fieldset className="flex flex-col items-start">
              <label>Name</label>
              <Input placeholder="ex. Janaiz" name="name" />
            </fieldset>
            <fieldset className="flex flex-col items-start">
              <label>PIC</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="PIC booth" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="riko">Riko</SelectItem>
                  <SelectItem value="bilal">Bilal</SelectItem>
                  <SelectItem value="ilhom">Ilham</SelectItem>
                </SelectContent>
              </Select>
            </fieldset>
            <fieldset className="flex flex-col items-start">
              <label>Image</label>
              <Input name="img" type="file" />
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
