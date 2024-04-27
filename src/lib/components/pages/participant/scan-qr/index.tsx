"use client";

import { useEffect, useState } from "react";

import { Html5Qrcode } from "html5-qrcode";
import { Button } from "~/lib/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "~/lib/components/ui/use-toast";
import { db } from "~/lib/api/firebase";
import { child, ref, get, onValue, update, push, set } from "firebase/database";
import { useCookies } from "next-client-cookies";
import { ListBooth, ParticipantStatus } from "~/lib/stores/app.atom";
import { useAtom } from "jotai";

export const ScanQr = () => {
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const [listBooth, setListBooth] = useAtom(ListBooth);
  const [participantStatus, setParticipantStatus] = useAtom(ParticipantStatus);
  const router = useRouter();
  const { toast } = useToast();
  const cookies = useCookies();
  const uid = cookies.get("uid");

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, "booth")).then((snapshot) => {
      if (snapshot.exists()) {
        setListBooth(snapshot.val());
      }
    });
    const statusUserRef = ref(db, `account/${uid}`);
    const unSubscribe = onValue(statusUserRef, async (snapshot) => {
      if (snapshot.exists()) {
        const participant = snapshot.val();
        setParticipantStatus(participant);

        if (
          participant.isScanned &&
          participant?.isScanned.includes(participant.currentBooth)
        ) {
          toast({
            variant: "destructive",
            title:
              "Upload Hasil Booth Saat Ini Sebelum Scan Booth Selanjutnya!",
          });
          router.replace("/participants");
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

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("scan-qr-reader");
    const qrCodeSuccessCallback = (decodedText: any) => {
      // decodedText = text hasil scan
      // decodedResult = {result text, decoderName, format dll}

      html5QrCode.stop().then(() => {
        // Show success message
        setShowQRScanner(false);
        // Check if decodedText === currentBooth
        if (decodedText === currentBooth.slug) {
          // set Firebase for current booth already scanned

          const dataActivty = {
            startDate: new Date(),
            booth: currentBooth.slug,
            endDate: "-",
            score: 0,
            status: "needValidation",
            totalMember: 0,
            teamName: participantStatus.name,
            uid,
          };
          const newActivityRef = push(ref(db, `activity`));
          const newActivityKey = newActivityRef.key;
          update(newActivityRef, dataActivty);

          const userUpdateData = {
            ...participantStatus,
            currentBooth: currentIndex,
            currentActivity: newActivityKey,
            isScanned: participantStatus.isScanned
              ? [...participantStatus.isScanned, currentIndex]
              : [currentIndex],
          };
          const updates: any = {};
          updates["/account/" + uid] = userUpdateData;
          update(ref(db), updates);
          toast({
            variant: "success",
            title: "Success Scan Booth",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Can't scan this booth, please go to the current Booth",
          });
        }
        router.replace("/participants");
      });
      /* handle success */
    };
    const qrCodeErrorCallback = (error: any) => {
      console.log(error);
      /* handle success */
    };

    // Check if when scan is the time is still available !!

    if (showQRScanner) {
      html5QrCode.start(
        { facingMode: "user" },
        { fps: 10, qrbox: { height: 250, width: 250 } },
        qrCodeSuccessCallback,
        qrCodeErrorCallback
      );
    } else {
      html5QrCode.clear();
    }
    // cleanup function when component will unmount
    return () => {
      //   html5QrCode.clear();
    };
  }, [showQRScanner]);

  return (
    <section className="h-[calc(100%-82px)]">
      {/* <Button onClick={() => router.push("/participants")}>Back to List</Button> */}
      <div className="text-center font-bold uppercase text-xl">
        {currentBooth?.name}
      </div>
      <div className="flex items-center justify-center h-full flex-col">
        <div
          id="scan-qr-reader"
          className="w-full h-[300px] flex items-center justify-center"
        ></div>
        {showQRScanner ? (
          <div className="mt-2 flex justify-center">
            <Button
              variant={"destructive"}
              onClick={() => {
                setShowQRScanner(false);
              }}
            >
              Stop Scan
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              setShowQRScanner(true);
            }}
          >
            Start Scan
          </Button>
        )}
      </div>
    </section>
  );
};
