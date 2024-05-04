import React from "react";
import LeaderboardList from "../features/leaderboard";

export default function Home() {
  return (
    <main className="container w-full min-h-screen h-full py-8 border-x">
      <LeaderboardList />
    </main>
  );
}
