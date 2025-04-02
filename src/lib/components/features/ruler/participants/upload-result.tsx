"use client";

import { useState, useEffect } from "react";
import { Button } from "~/lib/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/lib/components/ui/dialog";
import { Input } from "~/lib/components/ui/input";
import { storage, db } from "~/lib/api/firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { ref as refDb, update, get, child } from "firebase/database";
import { IParticipantStatus } from "~/lib/stores/app.atom";
import { toast } from "~/lib/components/ui/use-toast";
import { checkCountdownValid } from "~/lib/helper/check-countdown.helper";
import { fetchLog } from "~/lib/api/log";

interface IProps {
  typeResult: "file" | "link";
  activityId?: string;
  activity: any;
  participantStatus: IParticipantStatus;
  uid: string;
}

export default function UploadResult({
  typeResult,
  activityId,
  activity,
  participantStatus,
  uid,
}: IProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [endCountdown, setEndCountDown] = useState<any>();

  const handleSubmit = () => {
    if (checkCountdownValid(endCountdown)) {
      setIsLoading(true);
      if (typeResult === "file") {
        if (!file) {
          toast({
            title: "Pilih File",
          });
          return;
        }
        const storageRef = ref(storage, `result/${uid}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "running":
                setIsLoading(true);
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            return error;
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              updateData(downloadURL);
            });
          }
        );
      } else {
        updateData(result);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Failed.",
        description: "Waktu telah habis.",
      });
    }
  };

  useEffect(() => {
    get(child(refDb(db), "endCountdown")).then((countdownSnapshot) => {
      setEndCountDown(countdownSnapshot.val());
    });
  }, []);

  const currentBooth = participantStatus.currentBooth;

  const updateData = (result: string) => {
    setIsLoading(true);
    const data = {
      ...activity,
      status: "needInputScore",
      endDate: new Date(),
      result,
    };
    const userUpdateData = {
      ...participantStatus,
      currentBooth: currentBooth < 5 ? currentBooth + 1 : 0,
      editableActivity: participantStatus.currentActivity,
      currentActivity: "",
      isDone: participantStatus.isDone
        ? [...participantStatus.isDone, currentBooth]
        : [currentBooth],
      isFinish:
        participantStatus.isDone && participantStatus.isDone.length === 5
          ? true
          : false,
    };
    const updates: any = {};
    updates["/activity/" + activityId] = data;
    updates["/account/" + uid] = userUpdateData;
    update(refDb(db), updates).then(() => {
      setIsLoading(false);
      setOpen(false);
    });
    fetchLog({ state: "upload", ...updates });
  };

  return (
    <>
      <Button
        variant="default"
        className="w-24"
        onClick={() => setOpen(true)}
        disabled={isLoading}
      >
        Upload hasil
      </Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Upload hasil</DialogTitle>
            <form className="flex flex-col gap-2">
              {typeResult === "link" && (
                <fieldset className="flex flex-col items-start">
                  <label>Link</label>
                  <Input
                    onChange={(e) => setResult(e.target.value)}
                    placeholder="ex. https://www.instagram.com/astragemaislami/"
                    name="link"
                  />
                </fieldset>
              )}

              {typeResult === "file" && (
                <fieldset className="flex flex-col items-start">
                  <label>Image</label>
                  <Input
                    name="img"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile(e.target.files[0]);
                      } else {
                        setFile(null);
                      }
                    }}
                  />
                </fieldset>
              )}
              <Button
                type="button"
                className="mt-2"
                variant="default"
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button
                type="button"
                className="mt-2"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
