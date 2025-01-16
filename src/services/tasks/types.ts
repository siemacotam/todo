export type Task = {
  description: string;
  completed: boolean;
};

export type CreateTaskPayload = {
  pocketId: string;
  task: Task;
};

export type GetTasksPayload = {
  pocketId: string;
};

export type EditTaskPayload = {
  pocketId: string;
  taskId: string;
  task: {
    description: string;
    isCompleted: boolean;
  };
};

export type DeleteTaskPayload = {
  pocketId: string;
  taskId: string;
};

export interface ExtendedTask extends Task {
  isCompleted: boolean;
  pocket: string;
  _id: string;
}
