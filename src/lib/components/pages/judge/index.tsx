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

interface IListTeam {
  id: number;
  name: string;
  isValidate: boolean;
}

const CardTeam = (props: { name: string; isValidate: boolean }) => {
  const { name, isValidate } = props;
  return (
    <div className="py-5 px-6 rounded-lg shadow-md border flex justify-between items-center">
      <span>
        <p>{name}</p>
      </span>
      <span
        className={`p-2 ${
          isValidate ? "bg-green-600" : "bg-red-600"
        } text-white rounded-xl text-xs`}
      >
        <span>{isValidate ? "Validated" : "Not Validated"}</span>
      </span>
    </div>
  );
};

const data: { teams: IListTeam[] } = {
  teams: [
    {
      id: 1,
      name: "Team 1",
      isValidate: true,
    },
    {
      id: 2,
      name: "Team 2",
      isValidate: false,
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
                setDialogTeam(team);
                setOpenDialog(true);
              }}
            >
              <CardTeam name={team.name} isValidate={team.isValidate} />
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
