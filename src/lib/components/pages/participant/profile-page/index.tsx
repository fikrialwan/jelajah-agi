"use client";

import { useEffect } from "react";
import { UserCircleIcon } from "lucide-react";
import { useAtom } from "jotai";
import { ParticipantStatus, AllActivity } from "~/lib/stores/app.atom";
import { db } from "~/lib/api/firebase";
import { ref, onValue } from "firebase/database";
import { useCookies } from "next-client-cookies";
import { Button } from "~/lib/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "~/lib/api/firebase";

const Profile = () => {
  const [participantStatus, setParticipantStatus] = useAtom(ParticipantStatus);
  const [allActivity, setAllActivity] = useAtom(AllActivity);
  const cookies = useCookies();
  const uid = cookies.get("uid");
  const router = useRouter();

  useEffect(() => {
    const statusUserRef = ref(db, `account/${uid}`);
    const unSubscribe = onValue(statusUserRef, async (snapshot) => {
      if (snapshot.exists()) {
        setParticipantStatus(snapshot.val());
      }
    });

    const activityRef = ref(db, `activity`);
    const unSubscribeActivity = onValue(activityRef, async (snapshot) => {
      if (snapshot.exists()) {
        // setParticipantStatus(snapshot.val());
        const response = snapshot.val();
        const arraySnapshot = Object.keys(response)
          .map((res) => {
            let activity = response[res];
            return activity;
          })
          .filter((act) => act.uid === uid);
        setAllActivity(arraySnapshot);
      }
    });

    return () => {
      unSubscribe();
      unSubscribeActivity();
    };
  }, []);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("role");
      cookies.remove("uid");
      cookies.remove("indexUser");
      router.replace("/login");
    } catch (_) {
      cookies.remove("role");
      cookies.remove("uid");
      cookies.remove("indexUser");
      router.replace("/login");
    }
  };

  return (
    <main className="px-5 py-8">
      <div className="bg-neutral-200 rounded-xl p-5 shadow-sm flex items-center space-x-4 justify-between">
        <div className="flex space-x-3 items-center">
          <UserCircleIcon size={32} />
          <div>
            <strong>{participantStatus?.name}</strong>
          </div>
        </div>
        {uid ? (
          <Button onClick={handleLogOut}>Logout</Button>
        ) : (
          <Button onClick={() => router.replace("/login")}>Login</Button>
        )}
      </div>
      <div className="mt-5">
        {allActivity.length ? (
          <ul>
            {allActivity.map((activity) => {
              return (
                <li
                  key={activity.booth}
                  className="p-3 bg-neutral-200 rounded-xl mt-2 flex justify-between font-bold shadow-sm"
                >
                  <p className="uppercase">{activity.booth}</p>
                  <p>{activity.score}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="p-3 bg-neutral-200 rounded-xl">
            Belum Memiliki Aktifitas
          </div>
        )}
      </div>
    </main>
  );
};

export default Profile;
