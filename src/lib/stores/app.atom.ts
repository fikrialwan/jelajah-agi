import { atom } from "jotai";

export interface IBooth {
  slug: number;
  name: string;
  image: string;
  type: "file" | "link";
}

export interface IParticipantStatus {
  isDone: number[];
  currentBooth: number;
  currentActivity: string;
  isScanned: number[];
  index: number;
  name: string;
  type: string;
  isFinish: boolean;
}

export const ListBooth = atom<IBooth[] | []>([]);
export const ParticipantStatus = atom<IParticipantStatus>({
  index: 0,
  name: "",
  currentBooth: 0,
  type: "",
  isDone: [],
  isScanned: [],
  currentActivity: "",
  isFinish: false,
});
