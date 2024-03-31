import { PencilIcon, Trash, User } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "~/lib/components/ui/card";

interface IProps {
  title: string;
  img: string;
  pic: string;
}

export default function CardBooth({ title, img, pic }: IProps) {
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
            <p className="font-light text-sm flex flex-row gap-1 items-center">
              <User size={14} /> {pic}
            </p>
          </div>
          <button aria-label="EditButton">
            <PencilIcon className="text-primary" />
          </button>
          <button aria-label="DeleteButton">
            <Trash className="text-destructive" />
          </button>
        </CardContent>
      </Card>
    </li>
  );
}
