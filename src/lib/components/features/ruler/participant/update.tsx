"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { ref, update } from "firebase/database";
import { PencilIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { db } from "~/lib/api/firebase";
import { Button } from "~/lib/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/lib/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/lib/components/ui/form";
import { Input } from "~/lib/components/ui/input";
import { useToast } from "~/lib/components/ui/use-toast";
import { participantUpdateFormSchema } from "~/lib/schema/participant.schema";

interface IProps {
  uid: string;
  name: string;
  booth?: string;
}

export default function ParticipantUpdate({ uid, name, booth }: IProps) {
  const { toast } = useToast();

  const dialogCLoseRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof participantUpdateFormSchema>>({
    resolver: zodResolver(participantUpdateFormSchema),
    defaultValues: {
      name,
    },
  });

  async function onSubmit(values: z.infer<typeof participantUpdateFormSchema>) {
    if (!isLoading) {
      setLoading(true);
      update(ref(db, `account/${uid}`), {
        name: values.name,
      });
      form.reset();
      toast({
        variant: "success",
        title: "Success",
        description: "Update participant account successfully",
      });

      setLoading(false);
      dialogCLoseRef.current?.click();
    }
  }

  return (
    <Dialog>
      <DialogTrigger aria-label="EditButton">
        <PencilIcon className="text-primary" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Update participant</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: odegaard" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-2"
                variant="default"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Save"}
              </Button>
              <DialogClose ref={dialogCLoseRef} />
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
