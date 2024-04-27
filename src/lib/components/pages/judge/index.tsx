"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateParticipantFormSchema as formSchema } from "~/lib/schema/judgeAction.schema";

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
import { child, get, onValue, ref, update } from "firebase/database";
import { db } from "~/lib/api/firebase";
import { useCookies } from "next-client-cookies";
import { checkCountdownValid } from "~/lib/helper/check-countdown.helper";
import { useToast } from "../../ui/use-toast";

const CardTeam = (props: {
  name: string;
  status: string;
  score?: number;
  result?: string;
  id: string;
}) => {
  const { name, status, score, id, result } = props;
  return (
    <div className="py-5 px-6 rounded-lg shadow-md border flex justify-between items-center">
      <p>{name}</p>
      {status === "validation" && (
        <Button variant="destructive">Validate</Button>
      )}
      {status === "process" && <Button variant="outline">on Process</Button>}
      {status === "needInputScore" && (
        <Score team={name} id={id} result={result || ""} />
      )}
      {status === "done" && (
        <p className="text-green-600 text-2xl font-semibold">{score}</p>
      )}
    </div>
  );
};

const ListTeamBooth = () => {
  const cookies = useCookies();
  const { toast } = useToast();

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [dialogTeam, setDialogTeam] = useState<IActivity | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const activityRef = ref(db, "activity");
    const unsubscribe = onValue(activityRef, async (snapshot) => {
      const activitiesTemp: IActivity[] = [];
      const snapshotData = Object.entries(snapshot.val()).map(
        ([id, activity]) => ({ id, ...(activity as any) })
      );
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

  const handleSubmitValidate = async (values: z.infer<typeof formSchema>) => {
    const endCountdown = await get(child(ref(db), "endCountdown"));
    if (checkCountdownValid(endCountdown.val())) {
      update(ref(db, `activity/${dialogTeam?.id}`), {
        status: "process",
        startDate: new Date(),
        totalMember: values.numberOfParticipants,
      });
      setDialogTeam(null);
      setOpenDialog(false);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Failed.",
        description: "Waktu telah habis.",
      });
    }
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
                id={activity.id}
                result={activity.result}
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
