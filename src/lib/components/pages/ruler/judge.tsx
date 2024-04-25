import { UserData } from "~/data/user-dummy";
import CardJudge from "../../features/ruler/judge/card";
import JugeAdd from "../../features/ruler/judge/add";

export default function Judge() {
  return (
    <div className="flex flex-col gap-4 py-3 px-5">
      <h1 className="text-3xl font-semibold text-center">List Judge</h1>
      <JugeAdd />
      <ul className="flex flex-col gap-3">
        {UserData.map(({ name, booth }, index: number) => (
          <CardJudge key={index} name={name} booth={booth} />
        ))}
      </ul>
    </div>
  );
}
