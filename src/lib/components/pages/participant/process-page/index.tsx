"use client";

import { Button } from "~/lib/components/ui/button";
import { useState } from "react";

import { CurrentBooth } from "./current-page";
import { ListProcess } from "./list-process-page";
import { useRouter } from "next/navigation";
export interface IBooth {
  id: number;
  name: string;
  isDone: boolean;
  currentBooth: boolean;
}

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
      isDone: true,
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
  const [screen, setScreen] = useState<"current" | "process">("current");
  const currentBooth = data.listBooth.filter((booth) => booth.currentBooth)[0];
  const router = useRouter();
  return (
    <section className="h-[calc(100%-82px)]">
      <div className="flex justify-end gap-2">
        <Button
          variant={"default"}
          onClick={() => router.push("/participants/scan-qr")}
        >
          Scan QR
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            if (screen === "current") {
              setScreen("process");
            } else {
              setScreen("current");
            }
          }}
        >
          {screen === "current" ? <p>Lihat Proses</p> : <p>Liat Saat ini</p>}
        </Button>
      </div>
      <div className="flex justify-center items-center flex-col h-full gap-3">
        {screen === "current" ? (
          <CurrentBooth booth={currentBooth} />
        ) : (
          <ListProcess listProcess={data.listBooth} />
        )}
      </div>
    </section>
  );
};

export { ParticipantProcess };
