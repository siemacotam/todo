import { Pocket } from "@/services/pockets/types";
import { CreateTaskPayload } from "@/services/tasks/types";
import { create } from "zustand";

export const dialogTypes = {
  task: "task",
  pocket: "pocket",
  closed: "closed",
} as const;

export type DialogTypes = keyof typeof dialogTypes;

interface TodoState {
  dialog: DialogTypes | undefined;
  pocket: Pocket;
  task: CreateTaskPayload;
}

export type TodoActions = {
  setDialogState: (state: DialogTypes) => void;
  setPocketName: (name: string) => void;
  setPockedEmoji: (name: string) => void;
  resetPocketState: () => void;
  setTaskDescription: (name: string) => void;
  setTaskPocket: (id: string) => void;
  resetTaskState: () => void;
};

export const initialPocket = {
  name: "",
  emoji: "",
};

export const initialTask: CreateTaskPayload = {
  pocketId: "",
  task: {
    description: "",
    completed: false,
  },
};

export type TodoStore = TodoState & TodoActions;

export const defaultInitState: TodoState = {
  dialog: "closed",
  pocket: initialPocket,
  task: initialTask,
};

export const useTodoStore = create<TodoStore>((set) => ({
  ...defaultInitState,
  setDialogState: (newState: DialogTypes) =>
    set((state) => ({ ...state, dialog: newState })),
  setPocketName: (name: string) =>
    set((state) => ({ ...state, pocket: { ...state.pocket, name } })),
  setPockedEmoji: (emoji: string) =>
    set((state) => ({ ...state, pocket: { ...state.pocket, emoji } })),
  resetPocketState: () => set((state) => ({ ...state, pocket: initialPocket })),
  setTaskDescription: (description: string) =>
    set((state) => {
      const updated = { ...state.task.task };
      updated.description = description;

      return { ...state, task: { ...state.task, task: updated } };
    }),
  setTaskPocket: (id: string) =>
    set((state) => ({ ...state, task: { ...state.task, pocketId: id } })),
  resetTaskState: () => set((state) => ({ ...state, task: initialTask })),
}));
