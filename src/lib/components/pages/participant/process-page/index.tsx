"use client";

import { CheckIcon, TrophyIcon } from "lucide-react";
import { Button } from "~/lib/components/ui/button";

const data = {
  listBooth: [
    {
      id: 1,
      name: "Puzzle",
      isDone: true,
      currentBooth: false,
    },
    {
      id: 2,
      name: "Janaiz",
      isDone: false,
      currentBooth: false,
    },
    {
      id: 3,
      name: "Panahan",
      isDone: false,
      currentBooth: true,
    },
    {
      id: 4,
      name: "Panahan",
      isDone: false,
      currentBooth: false,
    },
    {
      id: 5,
      name: "Panahan",
      isDone: false,
      currentBooth: false,
    },
    {
      id: 6,
      name: "Panahan",
      isDone: false,
      currentBooth: false,
    },
  ],
};

const ParticipantProcess = () => {
  const currentBooth = data.listBooth.filter((booth) => booth.currentBooth)[0];
  return (
    <section className="h-[calc(100%-82px)]">
      <div className="flex justify-center items-center flex-col h-full gap-3">
        <p className="font-bold text-xl">BOOTH SAAT INI</p>
        <TrophyIcon className="text-primary" size={100} />
        <p className="uppercase font-bold text-2xl">{currentBooth.name}</p>
        <Button variant={"default"}>Scan QR</Button>
        <Button variant={"outline"}>Lihat Proses</Button>
      </div>
    </section>
  );
};

export { ParticipantProcess };
