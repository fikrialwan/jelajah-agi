import { CheckCircle2Icon } from "lucide-react";
import { IBooth, ParticipantStatus } from "~/lib/stores/app.atom";
import { useAtom } from "jotai";
import Image from "next/image";

export const ListProcess = ({ listProcess }: { listProcess: IBooth[] }) => {
  // const { listProcess } = props;
  const [participantStatus] = useAtom(ParticipantStatus);
  const currentIndex = participantStatus.currentBooth
    ? participantStatus.currentBooth
    : participantStatus.index;

  const sortedBooth = [
    ...listProcess.slice(participantStatus.index % 6),
    ...listProcess.slice(0, participantStatus.index % 6),
  ];

  return (
    <section className="w-full flex flex-col gap-3">
      {sortedBooth.map((item: any, index: number) => {
        return (
          <div
            className={`flex justify-between p-4 rounded-lg w-full border-2 shadow-lg ${
              item.indexBooth === currentIndex
                ? "border-primary"
                : participantStatus.isDone?.includes(item.indexBooth)
                ? "border-green-600"
                : "border-gray-600 opacity-50"
            }`}
            key={index}
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
                  currentIndex === item.indexBooth ? "font-bold" : ""
                }`}
              >
                {item.name}
              </p>
            </div>
            {participantStatus?.isDone?.includes(item.indexBooth) && (
              <CheckCircle2Icon className="text-green-600" />
            )}
          </div>
        );
      })}
    </section>
  );
};
