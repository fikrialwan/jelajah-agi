import { Plus } from "lucide-react";
import { Button } from "~/lib/components/ui/button";
import CardBooth from "../../features/ruler/booth/card";
import { BoothData } from "~/data/booth-dummy";

function Booth() {
  return (
    <div className="flex flex-col gap-4 py-3 px-5">
      <h1 className="text-3xl font-semibold text-center">List booth</h1>
      <Button variant="default" className="w-24 self-end">
        <Plus /> Add
      </Button>
      <ul className="flex flex-col gap-3">
        {BoothData.map(({ title, img, pic }, index: number) => (
          <CardBooth pic={pic} key={index} title={title} img={img} />
        ))}
      </ul>
    </div>
  );
}

export default Booth;
