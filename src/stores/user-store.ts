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
  editUserDialog: boolean;
  pockets: ExtendedPocket[];
  pickedPocket: string;
}

export type UserActions = {
  setUser: (user: User) => void;
  login: (user: User) => void;
  logout: () => void;
  toggleEditUserDialog: () => void;
  addPocket: (data: ExtendedPocket) => void;
  addTask: (data: ExtendedTask) => void;
  setPickedPocked: (id: string) => void;
  removeTask: (pocketId: string, taskId: string) => void;
  removePocket: (id: string) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  user: null,
  isLoggedIn: false,
  editUserDialog: false,
  pockets: [],
  pickedPocket: "",
};

export const useUserStore = create<UserStore>((set) => ({
  ...defaultInitState,
  setUser: (user: User) => set((state) => ({ ...state, user })),
  toggleEditUserDialog: () =>
    set((state) => ({ ...state, editUserDialog: !state.editUserDialog })),
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
  removeTask: (pocketId: string, taskId: string) => {
    return set((state) => {
      const updated = state.pockets.map((el) => {
        if (el._id === pocketId) {
          return { ...el, tasks: el.tasks.filter((el) => el !== taskId) };
        } else return el;
      });

      return { ...state, pockets: updated };
    });
  },
  removePocket: (id: string) =>
    set((state) => ({
      ...state,
      pickedPocket: "",
      pockets: state.pockets.filter((el) => el._id !== id),
    })),
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
