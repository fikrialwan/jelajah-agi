"use client";

import { useState } from "react";
import { Card, CardContent } from "../../ui/card";

const dataTeam = [
  { teamName: "Team 1", score: "100" },
  { teamName: "Team 2", score: "100" },
  { teamName: "Team 3", score: "100" },
  { teamName: "Team 4", score: "100" },
];
const dataLomba = [
  {
    name: "All",
  },
  {
    name: "Jenazah",
  },
];

const CardBoard = (props: {
  teamName: string;
  score: string;
  index: number;
}) => {
  const { teamName, score, index } = props;
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
        <span>{score} points</span>
      </CardContent>
    </Card>
  );
};

const LeaderboardList = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  return (
    <div className="w-full">
      <div className="text-center mb-5">
        <h1 className="font-semibold text-2xl">Leaderboard</h1>
      </div>
      <div className="border-b-2 flex gap-2 mb-4">
        {dataLomba.map((data, index) => {
          return (
            <div
              className={`p-2 cursor-pointer ${
                currentTab === index ? "font-bold" : ""
              }`}
              key={index}
              onClick={() => {
                setCurrentTab(index);
              }}
            >
              {data.name}
            </div>
          );
        })}
      </div>
      {dataTeam.map((item, index) => {
        return (
          <CardBoard
            score={item.score}
            teamName={item.teamName}
            key={index}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default LeaderboardList;
