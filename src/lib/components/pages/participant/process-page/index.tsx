"use client";

import { Button } from "~/lib/components/ui/button";
import { useState, useEffect } from "react";
import { useCookies } from "next-client-cookies";
import { useAtom } from "jotai";

import { CurrentBooth } from "./current-page";
import { ListProcess } from "./list-process-page";
import { useRouter } from "next/navigation";
import UploadResult from "~/lib/components/features/ruler/participants/upload-result";
import { db } from "~/lib/api/firebase";
import { child, ref, get, onValue } from "firebase/database";
import { ListBooth, ParticipantStatus } from "~/lib/stores/app.atom";

const ParticipantProcess = () => {
  const [screen, setScreen] = useState<"current" | "process">("current");
  const [listBooth, setListBooth] = useAtom(ListBooth);
  const [participantStatus, setParticipantStatus] = useAtom(ParticipantStatus);
  const [currentActivity, setCurrentActivity] = useState<any>();
  const cookies = useCookies();
  const uid = cookies.get("uid");
  const router = useRouter();

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, "booth")).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val(), "user");
        setListBooth(snapshot.val());
      }
    });
    const statusUserRef = ref(db, `account/${uid}`);
    const unSubscribe = onValue(statusUserRef, async (snapshot) => {
      if (snapshot.exists()) {
        setParticipantStatus(snapshot.val());
        const { currentActivity } = snapshot.val();
        if (currentActivity) {
          onValue(
            ref(db, `activity/${currentActivity}`),
            async (snapshotActivity) => {
              if (snapshotActivity.exists()) {
                setCurrentActivity(snapshotActivity.val());
              }
            }
          );
        }
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const currentIndex = participantStatus.currentBooth
    ? participantStatus.currentBooth
    : participantStatus.index % 6;
  const currentBooth = listBooth[currentIndex];

  console.log("participantStatus", participantStatus);

  return (
    <section className="h-[calc(100%-82px)]">
      {listBooth.length ? (
        <>
          <div className="flex justify-end gap-2">
            {!participantStatus.isScanned?.includes(currentIndex) && (
              <Button
                // variant={"default"}
                onClick={() => router.push("/participants/scan-qr")}
              >
                Scan QR
              </Button>
            )}
            <Button
              // variant={"outline"}
              onClick={() => {
                if (screen === "current") {
                  setScreen("process");
                } else {
                  setScreen("current");
                }
              }}
            >
              {screen === "current" ? (
                <p>Lihat Proses</p>
              ) : (
                <p>Liat Saat ini</p>
              )}
            </Button>
          </div>
          <div className="flex justify-center items-center flex-col h-full gap-3">
            {screen === "current" ? (
              <>
                <CurrentBooth booth={currentBooth} />
                {currentActivity?.status === "needValidation" ? (
                  <p>Mohon menunggu validasi dari Juri...</p>
                ) : (
                  currentActivity?.status === "process" && (
                    <UploadResult typeResult={currentBooth.type} />
                  )
                )}
              </>
            ) : (
              <ListProcess
                listProcess={listBooth.map((item, index: number) => {
                  return {
                    ...item,
                    indexBooth: index,
                  };
                })}
              />
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </section>
  );
};

export { ParticipantProcess };
