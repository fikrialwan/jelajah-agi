import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/lib/components/ui/card";
import ActivityUpdate from "./update";

interface IProps {
  name: string;
  booth: string;
  uid: string;
  score: number;
}

export default function CardActivity({ name, booth, uid, score }: IProps) {
  return (
    <li aria-label="CardUser">
      <Card>
        <CardContent className="py-6 flex flex-row gap-3 items-center">
          <div className="flex-1 flex flex-col gap-1">
            <CardTitle>{name}</CardTitle>
            <CardDescription>{booth}</CardDescription>
            <CardDescription className="text-lg font-semibold text-primary">
              {score}
            </CardDescription>
          </div>
          <ActivityUpdate uid={uid} />
        </CardContent>
      </Card>
    </li>
  );
}
