import pocketsService from "@/services/pockets/tasks.service";
import { ExtendedPocket } from "@/services/pockets/types";
import { ExtendedTask } from "@/services/tasks/types";
import { create } from "zustand";

export interface User {
  firstName: string;
  lastName: string;
}

interface UserState {
  isLoggedIn: boolean;
  user: User | null;
  pockets: ExtendedPocket[];
  pickedPocket: string;
}

export type UserActions = {
  setUser: (user: User) => void;
  login: (user: User) => void;
  logout: () => void;
  addPocket: (data: ExtendedPocket) => void;
  addTask: (data: ExtendedTask) => void;
  setPickedPocked: (id: string) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  user: null,
  isLoggedIn: false,
  pockets: [],
  pickedPocket: "",
};

export const useUserStore = create<UserStore>((set) => ({
  ...defaultInitState,
  setUser: (user: User) => set((state) => ({ ...state, user })),
  setPickedPocked: (id: string) =>
    set((state) => ({ ...state, pickedPocket: id })),
  addTask: (data: ExtendedTask) => {
    return set((state) => {
      const updated = state.pockets.map((el) => {
        if (el._id === data.pocket) {
          return { ...el, tasks: [...el.tasks, data._id] };
        } else return el;
      });

      return { ...state, pockets: updated };
    });
  },
  addPocket: (data: ExtendedPocket) =>
    set((state) => ({ ...state, pockets: [...state.pockets, data] })),
  login: async (user: User) => {
    const res = await pocketsService.get();
    let pockets: ExtendedPocket[];
    if (res) {
      pockets = res;
    }
    return set((state) => ({ ...state, isLoggedIn: true, user, pockets }));
  },
  logout: () => set((state) => ({ ...state, user: null, isLoggedIn: false })),
}));
