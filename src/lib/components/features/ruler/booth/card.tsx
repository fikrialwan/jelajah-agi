import { Trash, User } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "~/lib/components/ui/card";
// import BoothUpdate from "./update";
// import BoothDelete from "./delete";

interface IProps {
  title: string;
  img: string;
}

export default function CardBooth({ title, img }: IProps) {
  return (
    <li aria-label="CardBooth">
      <Card>
        <CardContent className="py-6 flex flex-row gap-3 items-center">
          <Image
            src={img}
            alt={title}
            width={60}
            height={60}
            objectFit="cover"
            objectPosition="center"
            className="rounded-full"
          />
          <div className="flex-1 flex flex-col gap-1">
            <CardTitle>{title}</CardTitle>
          </div>
          {/* <BoothUpdate />
          <BoothDelete /> */}
        </CardContent>
      </Card>
    </li>
  );
}
