"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { onValue, ref, update } from "firebase/database";
import { PencilIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
import { activityUpdateFormSchema } from "~/lib/schema/activity.schema";

interface IProps {
  uid: string;
}

export default function ActivityUpdate({ uid }: IProps) {
  const { toast } = useToast();

  const dialogCLoseRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const form = useForm<z.infer<typeof activityUpdateFormSchema>>({
    resolver: zodResolver(activityUpdateFormSchema),
    values: {
      score,
    },
  });

  useEffect(() => {
    const activityRef = ref(db, `activity/${uid}`);
    const unsubscribe = onValue(activityRef, (snapshot) => {
      const activity = snapshot.val();
      if (activity) {
        setScore(activity.score || 0);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [uid]);

  async function onSubmit(values: z.infer<typeof activityUpdateFormSchema>) {
    if (!isLoading) {
      setLoading(true);
      update(ref(db, `activity/${uid}`), {
        score: values.score,
      });
      form.reset();
      toast({
        variant: "success",
        title: "Success",
        description: "Update activity successfully",
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
          <DialogTitle className="text-center">Update activity</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Score</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex: 10"
                        {...field}
                        value={score}
                        onChange={(e) => setScore(Number(e.target.value))}
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
