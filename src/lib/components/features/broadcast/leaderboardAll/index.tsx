"use client";

import { useState } from "react";

import { useEffect } from "react";
import { db } from "~/lib/api/firebase";
import { ref, onValue, get, child } from "firebase/database";
import { MAX_MEMBER } from "~/lib/utils/config";
import { Card, CardContent } from "~/lib/components/ui/card";

interface ILeaderBoard {
  uid: string;
  name: string;
  score: number;
  doneBooth: string[];
  endDate: string;
}

const CardBoard = ({
  teamName,
  index,
  score,
}: {
  teamName: string;
  index: number;
  score: number;
}) => {
  return (
    <Card className="border border-primary shadow-md">
      <CardContent
        className={`flex justify-between items-center py-1 px-2 rounded-sm font-bold`}
      >
        <div className="flex flex-row items-center gap-2">
          <span
            className={`order p-2 rounded-full ${
              index === 0 ? "bg-[#d4af37]" : ""
            }`}
          >
            {index + 1}
          </span>
          {teamName}
        </div>
        <span>{score}</span>
      </CardContent>
    </Card>
  );
};

const BroadcastLeaderboardList = ({
  title = "Leaderboard",
}: {
  title?: string;
}) => {
  const [dataTeam, setDataTeam] = useState<any[]>([]);

  useEffect(() => {
    const activityRef = ref(db, `activity`);
    get(child(ref(db), "endCountdown")).then((countdownSnapshot) => {
      const endCountdown = countdownSnapshot.val();
      onValue(activityRef, async (snapshot) => {
        if (snapshot.exists()) {
          // setParticipantStatus(snapshot.val());
          const response = snapshot.val();
          const arraySnapshot = Object.keys(response)
            .map((res) => {
              let activity = response[res];
              return activity;
            })
            .filter((item) => item.status === "done");
          const reducedArray = arraySnapshot.reduce(
            (accumulator: ILeaderBoard[], currValue) => {
              const findIndex = accumulator.findIndex(
                (item) => item.uid === currValue.uid
              );
              // Check if participants already in the list
              // if not then score is placed not accumulated
              if (findIndex === -1) {
                return [
                  ...accumulator,
                  {
                    uid: currValue.uid,
                    name: currValue.teamName,
                    score:
                      currValue.score *
                      (currValue.totalMember > MAX_MEMBER
                        ? 1
                        : currValue.totalMember / MAX_MEMBER),
                    doneBooth: [currValue.booth],
                    endDate: currValue.endDate,
                  },
                ];
              } else {
                // if yes then score is accumulated
                const currentBooth = accumulator[findIndex];
                const minuteLeft = Math.ceil(
                  (new Date(endCountdown).getTime() -
                    new Date(currValue.endDate).getTime()) /
                    (1000 * 60)
                );
                accumulator[findIndex] = {
                  ...accumulator[findIndex],
                  score:
                    currentBooth.doneBooth.length === 5
                      ? currentBooth.score +
                        currValue.score *
                          (currValue.totalMember > MAX_MEMBER
                            ? 1
                            : currValue.totalMember / MAX_MEMBER) +
                        10 * minuteLeft
                      : currentBooth.score +
                        currValue.score *
                          (currValue.totalMember > MAX_MEMBER
                            ? 1
                            : currValue.totalMember / MAX_MEMBER),
                  doneBooth:
                    currValue.status === "done" &&
                    !currentBooth.doneBooth.includes(currValue.booth)
                      ? [...currentBooth.doneBooth, currValue.booth]
                      : currentBooth.doneBooth,
                  endDate: currValue.endDate,
                };
                return accumulator;
              }
            },
            []
          );
          const result = reducedArray.sort(
            (a: any, b: any) => b.score - a.score
          );
          setDataTeam(result);
          // setAllActivity(arraySnapshot);
        }
      });
    });
  }, []);

  return (
    <div className="w-full">
      <h1 className="font-semibold text-lg text-center w-full">{title}</h1>
      <ul className="flex w-full flex-col p-2 gap-2">
        {dataTeam.map((item, index) => {
          return (
            <li key={index}>
              <CardBoard
                teamName={item.name}
                index={index}
                score={item.score}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BroadcastLeaderboardList;
