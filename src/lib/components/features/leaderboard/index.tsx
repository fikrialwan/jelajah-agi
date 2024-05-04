"use client";

import { useState } from "react";
import { Card, CardContent } from "../../ui/card";
import Link from "next/link";
import { Button } from "../../ui/button";

import { useEffect } from "react";
import { db } from "~/lib/api/firebase";
import { ref, onValue, get, child } from "firebase/database";
import { MAX_MEMBER } from "~/lib/utils/config";

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
    <Card className="my-3 border border-primary shadow-md">
      <CardContent
        className={`flex justify-between items-center p-5 rounded-sm font-bold`}
      >
        <span>
          <span
            className={`mr-5 border p-3 rounded-full ${
              index === 0 ? "bg-[#d4af37]" : ""
            }`}
          >
            {index + 1}
          </span>
          {teamName}
        </span>
        <span>{score}</span>
      </CardContent>
    </Card>
  );
};

const LeaderboardList = () => {
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
      <div className="text-center mb-5">
        <h1 className="font-semibold text-2xl">Leaderboard</h1>
      </div>
      {dataTeam.map((item, index) => {
        return (
          <CardBoard
            teamName={item.name}
            key={index}
            index={index}
            score={item.score}
          />
        );
      })}
    </div>
  );
};

export default LeaderboardList;
