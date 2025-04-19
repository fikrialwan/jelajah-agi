import { formatterTime } from "~/lib/helper/formatter.helper";
import { getTime } from "~/lib/helper/time.helper";

export const CardTeam = (props: {
  name: string;
  score?: number;
  endDate: string;
  startDate: string;
  index: number;
}) => {
  const { name, score, endDate, startDate, index } = props;
  return (
    <div className="py-5 px-6 rounded-lg shadow-md border flex justify-between items-center">
      <div className="flex flex-row items-center gap-2">
        <p
          className={`order p-3 rounded-full ${
            index === 0
              ? "bg-[#d4af37]"
              : index === 1
              ? "bg-[#c0c0c0]"
              : index === 2
              ? "bg-[#CD7F32]"
              : ""
          }`}
        >
          {index + 1}
        </p>
        <h3>{name}</h3>
      </div>
      <p className="font-semibold text-end text-sm">
        <span className="text-green-600 text-xl">Score: {score}</span> <br />
        Time: {formatterTime(getTime(endDate) - getTime(startDate)).formatted}
      </p>
    </div>
  );
};
