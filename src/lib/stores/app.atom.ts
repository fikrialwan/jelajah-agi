import { atom } from "jotai";

export interface IBooth {
  slug: number;
  slugEnd: string;
  name: string;
  image: string;
  type: "file" | "link";
}

export interface IParticipantStatus {
  isDone: number[];
  currentBooth: number;
  currentActivity: string;
  editableActivity: string;
  isScanned: number[];
  index: number;
  name: string;
  type: string;
  isFinish: boolean;
}

export interface IActivity {
  booth: string;
  endDate: string;
  result: string;
  score: number;
  startDate: string;
  status: string;
  totalMember: number;
  uid: string;
  typeResult: "file" | "link";
  slug?: string;
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
  editableActivity: "",
  isFinish: false,
});

export const AllActivity = atom<IActivity[]>([]);

export const DialogEditActivity = atom<IActivity | null>(null);
