import { IBooth } from ".";
import { CheckCircle2Icon } from "lucide-react";

export const ListProcess = (props: { listProcess: IBooth[] }) => {
  const { listProcess } = props;
  return (
    <section className="w-full flex flex-col gap-3">
      {listProcess.map((item, index: number) => {
        return (
          <div
            className={`flex justify-between p-4 rounded-lg w-full border-2 shadow-lg ${
              item.currentBooth
                ? "border-primary"
                : item.isDone
                ? "border-green-600"
                : "border-gray-600 opacity-50"
            }`}
            key={index}
          >
            <div>
              {/* Tambah Logo Lomba  */}
              <p className={`${item.currentBooth ? "font-bold" : ""}`}>
                {item.name}
              </p>
            </div>
            {Boolean(item.isDone) && (
              <CheckCircle2Icon className="text-green-600" />
            )}
          </div>
        );
      })}
    </section>
  );
};
