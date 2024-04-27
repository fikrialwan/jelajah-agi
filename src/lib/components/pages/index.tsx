import React from "react";
import LeaderboardList from "../features/leaderboard";

export default function Home() {
  return (
    <main className="container w-full h-screen py-8 border-x">
      <LeaderboardList />
    </main>
  );
}
