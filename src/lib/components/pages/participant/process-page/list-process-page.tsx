import { EyeIcon } from "lucide-react";
import { useEffect } from "react";
import {
  IBooth,
  ParticipantStatus,
  DialogEditActivity,
  AllActivity,
} from "~/lib/stores/app.atom";
import { useAtom } from "jotai";
import Image from "next/image";
import { db } from "~/lib/api/firebase";
import { ref, onValue } from "firebase/database";
import { useCookies } from "next-client-cookies";
import EditViewResult from "~/lib/components/features/ruler/participants/edit-view-result";

export const ListProcess = ({ listProcess }: { listProcess: IBooth[] }) => {
  // const { listProcess } = props;
  const [participantStatus] = useAtom(ParticipantStatus);
  const [allActivity, setAllActivity] = useAtom(AllActivity);
  const [dialogEditActivity, setDialogEditActivity] =
    useAtom(DialogEditActivity);
  const cookies = useCookies();
  const uid = cookies.get("uid");

  const currentIndex = participantStatus.currentBooth
    ? participantStatus.currentBooth
    : participantStatus.index;

  const sortedBooth = [
    ...listProcess.slice(participantStatus.index % 6),
    ...listProcess.slice(0, participantStatus.index % 6),
  ];

  useEffect(() => {
    const activityRef = ref(db, `activity`);
    const unSubscribeActivity = onValue(activityRef, async (snapshot) => {
      if (snapshot.exists()) {
        // setParticipantStatus(snapshot.val());
        const response = snapshot.val();
        const arraySnapshot = Object.keys(response)
          .map((res) => {
            let activity = response[res];
            return {
              ...activity,
              slug: res,
            };
          })
          .filter((act) => act.uid === uid);
        setAllActivity(arraySnapshot);
      }
    });
    () => {
      unSubscribeActivity();
    };
  }, []);

  return (
    <>
      <section className="w-full flex flex-col gap-3">
        {sortedBooth.map((item: any, index: number) => {
          return (
            <div
              className={`flex justify-between p-4 rounded-lg w-full border-2 shadow-lg ${
                item.indexBooth === currentIndex && !participantStatus.isFinish
                  ? "border-primary"
                  : participantStatus.isDone?.includes(item.indexBooth)
                  ? "border-green-600"
                  : "border-gray-600 opacity-50"
              }`}
              key={index}
              onClick={() => {
                if (
                  participantStatus.isDone &&
                  participantStatus.isDone?.includes(item.indexBooth)
                ) {
                  const selectedActivity = allActivity.filter((activity) => {
                    return activity.booth === item.slug;
                  })[0];
                  setDialogEditActivity({
                    ...selectedActivity,
                    typeResult: item.type,
                  });
                }
              }}
            >
              <div className="flex gap-2">
                {/* Tambah Logo Lomba  */}
                <Image
                  width={20}
                  height={20}
                  src={item?.image}
                  alt={item?.name}
                />
                <p
                  className={`${
                    currentIndex === item.indexBooth &&
                    !participantStatus.isFinish
                      ? "font-bold"
                      : ""
                  }`}
                >
                  {item.name}
                </p>
              </div>
              {participantStatus?.isDone?.includes(item.indexBooth) && (
                <EyeIcon className="text-green-600" />
              )}
            </div>
          );
        })}
      </section>
      <EditViewResult />
    </>
  );
};
