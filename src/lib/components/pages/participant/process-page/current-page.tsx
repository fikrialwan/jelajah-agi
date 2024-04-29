import { IBooth, IParticipantStatus } from "~/lib/stores/app.atom";
import Image from "next/image";

const CurrentBooth = ({
  booth,
  participantStatus,
}: {
  booth: IBooth;
  participantStatus: IParticipantStatus;
}) => {
  return (
    <>
      <p className="font-bold text-xl">
        {participantStatus.isScanned &&
        participantStatus.isScanned.includes(participantStatus.currentBooth)
          ? "BOOTH SAAT INI"
          : "BOOTH SELANJUTNYA"}
      </p>
      {/* <TrophyIcon className="text-primary" size={100} /> */}
      <Image width={100} height={100} src={booth?.image} alt={booth?.name} />
      <p className="uppercase font-bold text-2xl">{booth?.name}</p>
      {/* <UploadResult typeResult={booth.typeResult} /> */}
    </>
  );
};

export { CurrentBooth };
