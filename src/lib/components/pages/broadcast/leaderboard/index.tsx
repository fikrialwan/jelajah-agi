"use client";

import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "~/lib/api/firebase";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/lib/components/ui/tabs";
import BroadcastLeaderboardComp from "~/lib/components/features/broadcast/leaderboard";
import LeaderboardList from "~/lib/components/features/leaderboard";

interface IBooth {
  name: string;
  slug: string;
}

export default function BroadcastLeaderboard() {
  const [booths, setBooths] = useState<IBooth[]>([]);

  useEffect(() => {
    const boothRef = ref(db, "booth");
    const unsubscribe = onValue(boothRef, (snapshot) => {
      if (snapshot) {
        setBooths(snapshot.val() as IBooth[]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (booths.length === 0) {
    return <div />;
  }

  return (
    <div className="w-full p-2">
      <Tabs defaultValue={"all"} className="w-full">
        <TabsList className="w-full flex flex-row justify-start overflow-x-auto">
          <TabsTrigger value={"all"}>All</TabsTrigger>
          {booths.map(({ slug, name }) => (
            <TabsTrigger key={slug} value={slug}>
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="all">
          <LeaderboardList hideTitle />
        </TabsContent>
        {booths.map(({ slug }) => (
          <TabsContent value={slug} key={slug}>
            <BroadcastLeaderboardComp booth={slug} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
