import { Store } from "lucide-react";
import { Card, CardContent, CardTitle } from "~/lib/components/ui/card";
import JudgeDelete from "./delete";
import JudgeUpdate from "./update";

interface IProps {
  name: string;
  booth?: string;
  uid: string;
}

export default function CardJudge({ name, booth, uid }: IProps) {
  return (
    <li aria-label="CardUser">
      <Card>
        <CardContent className="py-6 flex flex-row gap-3 items-center">
          <div className="flex-1 flex flex-col gap-1">
            <CardTitle>{name}</CardTitle>
            {booth && (
              <p className="font-light text-sm flex flex-row gap-1 items-center">
                <Store size={14} /> {booth}
              </p>
            )}
          </div>
          <JudgeUpdate />
          <JudgeDelete uid={uid} />
        </CardContent>
      </Card>
    </li>
  );
}
