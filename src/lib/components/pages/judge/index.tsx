"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Label } from "../../ui/label";
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
      <span>{name}</span>
      <span
        className={`p-2 ${
          isValidate ? "bg-green-600" : "bg-red-600"
        } text-white rounded-xl text-xs`}
      >
        {isValidate ? "Validated" : "Not Validated"}
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

  const handleSubmitValidate = (e: any) => {
    e.preventDefault();
    setDialogTeam(null);
    setOpenDialog(false);
    console.log("submit");
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
          <form onSubmit={handleSubmitValidate}>
            <div className="my-5 grid flex-1 gap-2">
              <Label htmlFor="numberOfParticipants">
                Number of Participants
              </Label>
              <Input
                type="number"
                id="numberOfParticipants"
                placeholder="Input Number of Participants"
              />
            </div>
            <DialogFooter>
              <Button type="submit" variant="default">
                Validate
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { ListTeamBooth };
