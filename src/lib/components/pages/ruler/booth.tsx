import CardBooth from "../../features/ruler/booth/card";
import { BoothData } from "~/data/booth-dummy";
import BoothAdd from "../../features/ruler/booth/add";

function Booth() {
  return (
    <div className="flex flex-col gap-4 py-3 px-5">
      <h1 className="text-3xl font-semibold text-center">List booth</h1>
      <BoothAdd />
      <ul className="flex flex-col gap-3">
        {BoothData.map(({ title, img, pic }, index: number) => (
          <CardBooth pic={pic} key={index} title={title} img={img} />
        ))}
      </ul>
    </div>
  );
}

export default Booth;
