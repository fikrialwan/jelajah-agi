import React from "react";
import LeaderboardList from "../features/leaderboard";

export default function Home() {
  return (
    <main className="container w-full h-screen py-8">
      {/* <h1 className="text-primary font-semibold text-2xl">Jelajah AGI</h1> */}
      <LeaderboardList />
    </main>
  );
}
