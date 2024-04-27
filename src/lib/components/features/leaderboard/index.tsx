"use client";

import { useState } from "react";
import { Card, CardContent } from "../../ui/card";
import Link from "next/link";
import { Button } from "../../ui/button";

import { useEffect } from "react";
import { db } from "~/lib/api/firebase";
import { ref, onValue } from "firebase/database";

const CardBoard = (props: { teamName: string; index: number }) => {
  const { teamName, index } = props;
  return (
    <Card className="my-3 border border-primary shadow-md">
      <CardContent
        className={`flex justify-between items-center p-5 rounded-sm font-bold`}
      >
        <span>
          <span
            className={`mr-5 border p-3 rounded-full ${
              index === 0
                ? "bg-[#d4af37]"
                : index === 1
                ? "bg-[#c0c0c0]"
                : index === 2
                ? "bg-[#CD7F32]"
                : ""
            }`}
          >
            {index + 1}
          </span>
          {teamName}
        </span>
        {/* <span>{score} points</span> */}
      </CardContent>
    </Card>
  );
};

const LeaderboardList = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [dataTeam, setDataTeam] = useState<any[]>([]);

  useEffect(() => {
    const activityRef = ref(db, `activity`);
    const unSubscribeActivity = onValue(activityRef, async (snapshot) => {
      if (snapshot.exists()) {
        // setParticipantStatus(snapshot.val());
        const response = snapshot.val();
        const arraySnapshot = Object.keys(response).map((res) => {
          let activity = response[res];
          return activity;
        });
        const reducedArray = arraySnapshot.reduce(
          (accumulator: any[], currValue) => {
            const findIndex = accumulator.findIndex(
              (item) => item.uid === currValue.uid
            );
            if (findIndex === -1) {
              return [
                ...accumulator,
                {
                  uid: currValue.uid,
                  name: currValue.teamName,
                  score: currValue.score,
                },
              ];
              // console.log(accumulator[findIndex], "accumulator[findIndex]");
            } else {
              accumulator[findIndex] = {
                ...accumulator[findIndex],
                score: accumulator[findIndex].score + currValue.score,
              };
              return accumulator;
            }
          },
          []
        );
        const result = reducedArray.sort((a, b) => b.score - a.score);
        console.log("result", result);
        setDataTeam(result);
        // setAllActivity(arraySnapshot);
      }
    });

    return () => {
      unSubscribeActivity();
    };
  }, []);
  return (
    <div className="w-full">
      <div className="text-center mb-5">
        <h1 className="font-semibold text-2xl">Leaderboard</h1>
      </div>
      {dataTeam.map((item, index) => {
        return <CardBoard teamName={item.name} key={index} index={index} />;
      })}
    </div>
  );
};

export default LeaderboardList;
