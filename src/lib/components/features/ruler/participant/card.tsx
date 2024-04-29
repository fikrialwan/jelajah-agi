import { Card, CardContent, CardTitle } from "~/lib/components/ui/card";
import ParticipantUpdate from "./update";
import ParticipantDelete from "./delete";

interface IProps {
  name: string;
  booth?: string;
  uid: string;
}

export default function CardParticipant({ name, booth, uid }: IProps) {
  return (
    <li aria-label="CardUser">
      <Card>
        <CardContent className="py-6 flex flex-row gap-3 items-center">
          <div className="flex-1 flex flex-col gap-1">
            <CardTitle>{name}</CardTitle>
          </div>
          <ParticipantUpdate uid={uid} name={name} booth={booth} />
          <ParticipantDelete uid={uid} />
        </CardContent>
      </Card>
    </li>
  );
}
