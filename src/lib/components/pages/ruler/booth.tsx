"use client";

import { useEffect, useState } from "react";
import CardBooth from "../../features/ruler/booth/card";
import { onValue, ref } from "firebase/database";
import { db } from "~/lib/api/firebase";

interface IBooth {
  image: string;
  name: string;
  slug: string;
}

function Booth() {
  const [booths, setBooths] = useState<IBooth[]>([]);

  useEffect(() => {
    const boothRef = ref(db, "booth");
    const unsubscribe = onValue(boothRef, (snapshot) => {
      setBooths(snapshot.val() as IBooth[]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 py-3 px-5">
      <h1 className="text-3xl font-semibold text-center">List booth</h1>
      {/* <BoothAdd />  */}
      <ul className="flex flex-col gap-3">
        {booths.map(({ image, name }, index: number) => (
          <CardBooth key={index} title={name} img={image} />
        ))}
      </ul>
    </div>
  );
}

export default Booth;
