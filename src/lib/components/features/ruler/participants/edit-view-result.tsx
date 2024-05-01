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
import { ParticipantStatus, DialogEditActivity } from "~/lib/stores/app.atom";
import { toast } from "~/lib/components/ui/use-toast";
import { checkCountdownValid } from "~/lib/helper/check-countdown.helper";
import { useAtom } from "jotai";
import Image from "next/image";

export default function EditViewResult() {
  const [open, setOpen] = useAtom(DialogEditActivity);
  const [participant] = useAtom(ParticipantStatus);
  const [result, setResult] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [viewType, setViewType] = useState<"view" | "edit">("view");
  const [endCountdown, setEndCountDown] = useState<any>();

  useEffect(() => {
    get(child(refDb(db), "endCountdown")).then((countdownSnapshot) => {
      setEndCountDown(countdownSnapshot.val());
    });
  }, []);

  const handleSubmit = () => {
    if (checkCountdownValid(endCountdown)) {
      if (open?.typeResult === "file") {
        if (!file) {
          toast({
            title: "Pilih File",
          });
          return;
        }
        const storageRef = ref(storage, `result/${open.uid}/${file.name}`);
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

  const updateData = (result: string) => {
    const data = {
      ...open,
      endDate: new Date(),
      result,
    };
    const updates: any = {};
    updates["/activity/" + open?.slug] = data;
    update(refDb(db), updates).then(() => {
      setOpen(null);
      setViewType("view");
    });
  };

  return (
    <Dialog open={open !== null ? true : false}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Activity Booth</DialogTitle>
          <form className="flex flex-col gap-2">
            {open?.typeResult === "file" ? (
              viewType === "view" ? (
                <div className="flex justify-center">
                  <div className="w-[75%] aspect-square relative ">
                    <Image src={open.result} fill alt="activity" />
                  </div>
                </div>
              ) : (
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
              )
            ) : viewType === "view" ? (
              <div>
                <a href={open?.result}>Link</a>
              </div>
            ) : (
              <fieldset className="flex flex-col items-start">
                <label>Link</label>
                <Input
                  onChange={(e) => setResult(e.target.value)}
                  placeholder="ex. https://www.instagram.com/astragemaislami/"
                  name="link"
                />
              </fieldset>
            )}

            {participant.editableActivity === open?.slug &&
            open.status !== "done" ? (
              viewType === "view" ? (
                <Button
                  type="button"
                  className="mt-2"
                  variant="default"
                  onClick={() => {
                    setViewType("edit");
                  }}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  type="button"
                  className="mt-2"
                  variant="default"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )
            ) : (
              ""
            )}

            <Button
              type="button"
              className="mt-2"
              variant="secondary"
              onClick={() => {
                setViewType("view");
                setOpen(null);
              }}
            >
              Close
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
