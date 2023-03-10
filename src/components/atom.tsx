import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export interface IOption {
  option: string;
}

export interface IForm {
  toDo: string;
}

export const optionState = atom<IOption[]>({
  key: "option",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
  key: "ToDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export interface ICategory {
  category: string;
}

export const categoryState = atom({
  key: "Category",
  default: "TO_DO",
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "selector",
  get: ({ get }) => {
    const category = get(categoryState);
    const toDo = get(toDoState);
    return toDo.filter((value) => value.category === category);
  },
});
