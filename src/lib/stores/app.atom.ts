import { atom } from "jotai";

export interface IBooth {
  id: number;
  name: string;
  image: string;
  typeResult: "file" | "link";
}

export interface IParticipantStatus {
  isDone: number[];
  currentBooth?: number;
  isScanned: number[];
  index: number;
  name: string;
  type: string;
}

export const ListBooth = atom<IBooth[] | []>([]);
export const ParticipantStatus = atom<IParticipantStatus>({
  index: 0,
  name: "",
  type: "",
  isDone: [],
  isScanned: [],
});
