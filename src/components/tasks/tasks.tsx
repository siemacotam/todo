"use client";

import { useUserStore } from "@/stores/user-store";
import Emoji from "../emoji/emoji";
import { useEffect, useState } from "react";
import { ExtendedTask } from "@/services/tasks/types";
import tasksService from "@/services/tasks/tasks.service";
import FulscreenLoader from "../fulscreen-loader";
import TaskElement from "./task";
import DeleteButton from "../buttons/delete-button";
import { useCRUDActions } from "@/hooks/useActions";

const Tasks = () => {
  const [showCompleted, setShowCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<ExtendedTask[]>([]);
  const { deletePocket } = useCRUDActions();

  const { pickedPocket, pockets } = useUserStore();

  const data = pockets.find((el) => el._id === pickedPocket);

  const updateTasks = (id: string) => {
    setTasks((prev) => {
      return prev.map((el) => {
        if (el._id === id) {
          const updated = { ...el, isCompleted: !el.isCompleted };
          return updated;
        } else {
          return el;
        }
      });
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((el) => el._id !== id));
  };

  const handleDeletePocket = async () => {
    setLoading(true);
    await deletePocket();
    setLoading(false);
  };

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      const res = await tasksService
        .get({ pocketId: pickedPocket })
        .catch((err) => {
          console.log(err);
        });

      if (res) {
        setTasks(res);
      }
      setLoading(false);
    };
    if (pickedPocket) {
      getTasks();
    }
  }, [pickedPocket, pockets]);

  if (!data)
    return <div className="p-10 flex-grow">Please pick pocket to see data</div>;

  const { emoji, name } = data;

  const tasksToDo = tasks.filter((el) => !el.isCompleted).length;

  const source = showCompleted ? tasks : tasks.filter((el) => !el.isCompleted);

  if (loading) return <FulscreenLoader />;

  return (
    <div className="px-5 py-10 md:px-10 w-full">
      <div className="flex gap-2 items-center">
        <Emoji name={emoji} />
        <p className="text-2xl font-semibold">{name}</p>
      </div>
      <div className="mt-3 md:mt-0 flex gap-2 md:gap-0 flex-col md:flex-row md:justify-between md:items-center">
        <p className="text-gray-600 text-sm">
          Remaining {tasksToDo} from {tasks.length} tasks.{" "}
        </p>
        <button
          className="h-9 rounded-[8px] p-[8px] bg-white text-sm font-semibold hover:text-accent-500 hover:bg-accent-100"
          onClick={() => setShowCompleted((prev) => !prev)}
        >
          {showCompleted ? "Hide completed" : "Show completed"}
        </button>
      </div>
      {source.length === 0 && (
        <p className="mt-10">No task to show. Add new ones</p>
      )}
      <ul
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        className="space-y-2 mt-8 overflow-y-scroll max-h-[60vh]"
      >
        {source.map((el) => {
          return (
            <TaskElement
              key={el._id}
              task={{ ...el }}
              setTasks={updateTasks}
              deleteTask={deleteTask}
            />
          );
        })}
      </ul>
      <div className="mt-10 flex gap-2 items-center">
        <DeleteButton loading={loading} handleClick={handleDeletePocket} />
        <p className="text-sm font-semibold text-gray-700">Delete pocket</p>
      </div>
    </div>
  );
};

export default Tasks;
