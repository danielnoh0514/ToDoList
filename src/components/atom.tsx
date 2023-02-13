import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export interface IData {
  option: string;
}

export const optionState = atom<IData[]>({
  key: "option",
  default: [],
});

export const toDoState = atom<IToDo[]>({
  key: "ToDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<"TO_DO" | "DOING" | "DONE">({
  key: "Category",
  default: "TO_DO",
});

export const toDoSelector = selector({
  key: "selector",
  get: ({ get }) => {
    const category = get(categoryState);
    const toDo = get(toDoState);
    return toDo.filter((value) => value.category === category);
  },
});
