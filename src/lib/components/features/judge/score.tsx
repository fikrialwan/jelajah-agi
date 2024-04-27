"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { child, get, ref, update } from "firebase/database";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import Link from "next/link";
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
import { Input } from "~/lib/components/ui/input";
import { inputScoreFormSchema } from "~/lib/schema/judgeAction.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useRef } from "react";
import { checkCountdownValid } from "~/lib/helper/check-countdown.helper";
import { useToast } from "../../ui/use-toast";

interface IProps {
  team: string;
  result: string;
  id: string;
}

export default function Score({ team, result, id }: IProps) {
  const cookies = useCookies();
  const { toast } = useToast();

  const dialogCLoseRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof inputScoreFormSchema>>({
    resolver: zodResolver(inputScoreFormSchema),
  });

  const handleSave = async (values: z.infer<typeof inputScoreFormSchema>) => {
    const endCountdown = await get(child(ref(db), "endCountdown"));
    if (checkCountdownValid(endCountdown.val())) {
      update(ref(db, `activity/${id}`), {
        status: "done",
        score: values.score,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Failed.",
        description: "Waktu telah habis.",
      });
    }
    dialogCLoseRef.current?.click();
  };

  return (
    <Dialog>
      <Button variant="default" className="w-24 self-end" asChild>
        <DialogTrigger>Input Score</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Input score {team}</DialogTitle>
          {cookies.get("boothType") === "file" ? (
            <div>
              <p>Hasil :</p>
              <div className="relative w-full aspect-square">
                <Image
                  src={result}
                  fill
                  objectFit="contain"
                  objectPosition="center"
                  alt="image result"
                />
              </div>
            </div>
          ) : (
            <div className="pt-8 w-full">
              <Button asChild variant="outline" className="w-full">
                <Link href={result} target="_blank">
                  List hasil upload
                </Link>
              </Button>
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="score"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Score</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          id="score"
                          placeholder="ex. 10"
                          {...field}
                          onChange={(event) =>
                            field.onChange(Number(event.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button type="submit" className="mt-2" variant="default">
                Save
              </Button>
              <DialogClose ref={dialogCLoseRef} className="hidden" />
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
