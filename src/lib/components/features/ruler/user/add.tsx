import { Plus } from "lucide-react";
import { Button } from "~/lib/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/lib/components/ui/dialog";
import { Input } from "~/lib/components/ui/input";

export default function AddUser() {
  return (
    <Dialog>
      <Button variant="default" className="w-24 self-end" asChild>
        <DialogTrigger>
          <Plus /> Add
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Add user</DialogTitle>
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
