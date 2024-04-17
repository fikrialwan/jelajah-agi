import UploadResult from "~/lib/components/features/ruler/participants/upload-result";
import { IBooth } from ".";
import { TrophyIcon } from "lucide-react";

const CurrentBooth = (props: { booth: IBooth }) => {
  const { booth } = props;
  return (
    <>
      <p className="font-bold text-xl">BOOTH SAAT INI</p>
      <TrophyIcon className="text-primary" size={100} />
      <p className="uppercase font-bold text-2xl">{booth.name}</p>
      <UploadResult typeResult={booth.typeResult} />
    </>
  );
};

export { CurrentBooth };
