import { zodResolver } from "@hookform/resolvers/zod";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { auth, db } from "~/lib/api/firebase";
import { Button } from "~/lib/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { ToastAction } from "~/lib/components/ui/toast";
import { participantAddFormSchema } from "~/lib/schema/participant.schema";

export default function ParticipantAdd() {
  const { toast } = useToast();

  const dialogCLoseRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof participantAddFormSchema>>({
    resolver: zodResolver(participantAddFormSchema),
  });

  async function onSubmit(values: z.infer<typeof participantAddFormSchema>) {
    if (!isLoading) {
      setLoading(true);
      const account = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (account) {
        set(ref(db, `account/${account.user.uid}`), {
          name: values.name,
          index: 0,
          type: "participants",
        });
        form.reset();
        toast({
          variant: "success",
          title: "Success",
          description: "Create participant account successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Login failed.",
          description: "Please check your email and password again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }

      setLoading(false);
      dialogCLoseRef.current?.click();
    }
  }

  return (
    <Dialog>
      <Button variant="default" className="w-24 self-end" asChild>
        <DialogTrigger>
          <Plus /> Add
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Add participant</DialogTitle>
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: odegaard@gmail.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        {...field}
                      />
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
