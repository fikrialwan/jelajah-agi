import { UserData } from "~/data/user-dummy";
import CardUser from "../../features/ruler/user/card";
import AddUser from "../../features/ruler/user/add";

export default function User() {
  return (
    <div className="flex flex-col gap-4 py-3 px-5">
      <h1 className="text-3xl font-semibold text-center">List user</h1>
      <AddUser />
      <ul className="flex flex-col gap-3">
        {UserData.map(({ name, booth }, index: number) => (
          <CardUser key={index} name={name} booth={booth} />
        ))}
      </ul>
    </div>
  );
}
