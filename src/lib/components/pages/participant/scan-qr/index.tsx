"use client";

import { useEffect, useState } from "react";
// import dayjs from "dayjs";

import { Html5Qrcode } from "html5-qrcode";
import { Button } from "~/lib/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "~/lib/components/ui/use-toast";

export const ScanQr = () => {
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Get data current booth ( const currentBooth )
    const currentBooth = "janaiz";
    const html5QrCode = new Html5Qrcode("scan-qr-reader");
    const qrCodeSuccessCallback = (decodedText: any) => {
      // decodedText = text hasil scan
      // decodedResult = {result text, decoderName, format dll}

      html5QrCode.stop().then(() => {
        // Show success message
        setShowQRScanner(false);
        // Check if decodedText === currentBooth
        if (decodedText === currentBooth) {
          // set Firebase for current booth already scanned
          const data = {
            checkedInTime: new Date(),
          };
          console.log("data", data);
        } else {
          toast({
            variant: "destructive",
            title: "Can't scan this booth, please go to the current Booth",
          });
          // alert("go to current booth");
          // show message 'cant scan the booth'
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
      <Button onClick={() => router.push("/participants")}>Back to List</Button>
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
