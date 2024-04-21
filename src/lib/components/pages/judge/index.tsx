"use client";

import { useState } from "react";
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

interface IListTeam {
  id: number;
  name: string;
  status: "validate" | "process" | "validateDone" | "done";
  score?: number;
}

const CardTeam = (props: {
  name: string;
  status: "validate" | "process" | "validateDone" | "done";
  score?: number;
}) => {
  const { name, status, score } = props;
  return (
    <div className="py-5 px-6 rounded-lg shadow-md border flex justify-between items-center">
      <p>{name}</p>
      {status === "validate" && <Button variant="destructive">Validate</Button>}
      {status === "process" && <Button variant="outline">on Process</Button>}
      {status === "validateDone" && <Score team={name} />}
      {status === "done" && (
        <p className="text-green-600 text-2xl font-semibold">{score}</p>
      )}
    </div>
  );
};

const data: { teams: IListTeam[] } = {
  teams: [
    {
      id: 1,
      name: "Team 1",
      status: "validate",
    },
    {
      id: 2,
      name: "Team 2",
      status: "process",
    },
    {
      id: 3,
      name: "Team 3",
      status: "validateDone",
    },
    {
      id: 4,
      name: "Team 4",
      status: "done",
      score: 10,
    },
  ],
};

const ListTeamBooth = () => {
  const [dialogTeam, setDialogTeam] = useState<IListTeam | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfParticipants: 0,
    },
  });

  const handleSubmitValidate = (values: z.infer<typeof formSchema>) => {
    // e.preventDefault();
    setDialogTeam(null);
    setOpenDialog(false);
    console.log("submit", values);
  };
  return (
    <>
      <div className="flex w-full flex-col">
        {data.teams.map((team, index) => {
          return (
            <button
              key={index}
              className="mb-5"
              onClick={() => {
                if (team.status === "validate") {
                  setDialogTeam(team);
                  setOpenDialog(true);
                }
              }}
            >
              <CardTeam
                name={team.name}
                status={team.status}
                score={team.score}
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
