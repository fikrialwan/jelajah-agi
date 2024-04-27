"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { child, get, ref, set } from "firebase/database";
import { db } from "~/lib/api/firebase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface IProps {
  isRuler?: boolean;
}

export default function Countdown({ isRuler }: IProps) {
  const [countdown, setCountdown] = useState<string>("00:00:00");

  useEffect(() => {
    setInterval(() => {
      get(child(ref(db), "endCountdown")).then((snapshot) => {
        if (snapshot.val() === "-") {
          setCountdown("00:00:00");
        } else {
          const now = new Date();
          const endCountdown = new Date(snapshot.val());
          if (now.getTime() < endCountdown.getTime()) {
            const difference = endCountdown.getTime() - now.getTime();

            const hours: number = Math.floor(difference / (1000 * 60 * 60));
            const minutes: number = Math.floor(
              (difference % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds: number = Math.floor(
              (difference % (1000 * 60)) / 1000
            );

            // Format hours, minutes, and seconds
            const formattedHours: string =
              hours < 10 ? "0" + hours : hours.toString();
            const formattedMinutes: string =
              minutes < 10 ? "0" + minutes : minutes.toString();
            const formattedSeconds: string =
              seconds < 10 ? "0" + seconds : seconds.toString();

            setCountdown(
              `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
            );
          } else {
            setCountdown("00:00:00");
          }
        }
      });
    }, 100);
  }, []);

  const handleStart = () => {
    const now = new Date();
    now.setHours(now.getHours() + 2);
    set(ref(db, "endCountdown"), now.toString());
  };

  const handleClear = () => {
    set(ref(db, "endCountdown"), "-");
  };

  return (
    <div className="w-full h-screen flex flex-col gap-3 items-center justify-center">
      <time className="font-semibold text-4xl">{countdown}</time>
      {isRuler && (
        <div className="flex flex-row gap-3">
          <Button
            className="w-full max-w-16"
            onClick={handleStart}
            disabled={countdown !== "00:00:00"}
          >
            Start
          </Button>
          {Boolean(countdown !== "00:00:00") && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full max-w-16">
                  Reset
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Apakah anda yakin akan mereset countdown yang sedang
                    berjalan ?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button asChild variant="outline">
                    <AlertDialogCancel>Tidak</AlertDialogCancel>
                  </Button>
                  <Button asChild variant="destructive" className="mb-2 md:m-0">
                    <AlertDialogAction onClick={handleClear}>
                      Ya
                    </AlertDialogAction>
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      )}
    </div>
  );
}
