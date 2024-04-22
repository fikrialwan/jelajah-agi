"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateParticipantFormSchema as formSchema } from "~/lib/schema/judgeValidate.schema";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";

import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import Score from "../../features/judge/score";
import { IActivity } from "~/lib/interfaces/activity.interface";
import { child, get, onValue, ref } from "firebase/database";
import { db } from "~/lib/api/firebase";
import { useCookies } from "next-client-cookies";

const CardTeam = (props: { name: string; status: string; score?: number }) => {
  const { name, status, score } = props;
  return (
    <div className="py-5 px-6 rounded-lg shadow-md border flex justify-between items-center">
      <p>{name}</p>
      {status === "validation" && (
        <Button variant="destructive">Validate</Button>
      )}
      {status === "process" && <Button variant="outline">on Process</Button>}
      {status === "needInputScore" && <Score team={name} />}
      {status === "done" && (
        <p className="text-green-600 text-2xl font-semibold">{score}</p>
      )}
    </div>
  );
};

const ListTeamBooth = () => {
  const cookies = useCookies();

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [dialogTeam, setDialogTeam] = useState<IActivity | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfParticipants: 0,
    },
  });

  useEffect(() => {
    const activityRef = ref(db, "activity");
    const unsubscribe = onValue(activityRef, async (snapshot) => {
      const activitiesTemp: IActivity[] = [];
      const snapshotData = snapshot.val() as any[];
      if (snapshotData) {
        for (const item of snapshotData) {
          if (item.booth === cookies.get("booth")) {
            const name = await get(child(ref(db), `account/${item.uid}/name`));
            activitiesTemp.push({
              ...(item as Omit<IActivity, "name">),
              name: name.val(),
            });
          }
        }
      }
      setActivities(activitiesTemp);
    });

    return () => {
      unsubscribe();
    };
  }, [cookies]);

  const handleSubmitValidate = (values: z.infer<typeof formSchema>) => {
    // e.preventDefault();
    setDialogTeam(null);
    setOpenDialog(false);
    console.log("submit", values);
  };
  return (
    <>
      <div className="flex w-full flex-col">
        {activities.map((activity, index) => {
          return (
            <button
              key={index}
              className="mb-5"
              onClick={() => {
                if (activity.status === "validation") {
                  setDialogTeam(activity);
                  setOpenDialog(true);
                }
              }}
            >
              <CardTeam
                name={activity.name}
                status={activity.status}
                score={activity.score}
              />
            </button>
          );
        })}
      </div>
      <Dialog
        open={openDialog}
        onOpenChange={(e) => {
          if (!e) {
            setDialogTeam(null);
            setOpenDialog(false);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Validasi {dialogTeam?.name}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitValidate)}>
              <section className="my-5 grid flex-1 gap-2">
                <FormField
                  control={form.control}
                  name="numberOfParticipants"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Number of Participants</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            id="numberOfParticipants"
                            placeholder="Input Number of Participants"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </section>
              <DialogFooter>
                <Button type="submit" variant="default">
                  Validate
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { ListTeamBooth };
