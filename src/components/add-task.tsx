"use client";

import { useTodoStore } from "@/stores/todo-store";
import { FormEvent, useState } from "react";
import { useUserStore } from "@/stores/user-store";
import Emoji from "./emoji/emoji";
import tasksService from "@/services/tasks/tasks.service";
import Image from "next/image";
import rectangle from "@/assets/rectangle-white.svg";

const AddTask = () => {
  const [loading, setLoading] = useState(false);
  const { setDialogState, setTaskPocket, task, resetTaskState } =
    useTodoStore();
  const [error, setError] = useState("");
  const { pockets, addTask } = useUserStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const description = formData.get("description") as string;
    const props = {
      pocketId: task.pocketId,
      task: { description, completed: formData.get("completed") === "on" },
    };

    if (!description) {
      setError("Description is required");
      return;
    }
    if (!task.pocketId) {
      setError("PocketId is required");
      return;
    }

    setLoading(true);

    const res = await tasksService.create(props).catch((err) => {
      setError(err?.response?.data?.message ?? "");
    });

    if (res) {
      addTask(res);
      setDialogState("closed");
      resetTaskState();
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <input
            type="text"
            name="description"
            placeholder="Create a new task"
            className="pr-4 pl-14 py-2 h-[40px] text-sm text-black rounded bg-gray-50  border-gray-400 w-full outline-[#333]"
          />

          <div className="absolute left-4">
            <Image
              src={rectangle}
              height={24}
              width={24}
              alt="rectangle icon"
            />
          </div>

          <div className="absolute right-1">
            <button
              type="submit"
              disabled={loading}
              className="h-[34px] w-[64px] rounded-[8px] bg-gray-100 text-sm flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 mx-auto border-4 border-blue-500 border-solid border-t-transparent border-t-4 rounded-full animate-spin" />
              ) : (
                "Create"
              )}
            </button>
          </div>
        </div>
      </form>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <p className="my-3 font-medium text-sm">Select pocket</p>
      <div>
        <ul
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          className="space-y-[6px] overflow-y-scroll max-h-[300px]"
        >
          {pockets.map(({ _id, name, emoji, tasks }) => {
            const isPicked = _id === task.pocketId;

            return (
              <li
                onClick={() => setTaskPocket(_id)}
                className={`flex ${
                  isPicked ? "bg-accent-500 text-white" : ""
                } gap-4 p-2 rounded-[6px] items-center`}
                key={_id}
              >
                <Emoji name={emoji} />
                <p className=" text-sm font-medium flex-grow overflow-hidden whitespace-nowrap text-ellipsis">
                  {name}
                </p>
                <div className="w-6 h-6 rounded-[4px] bg-accent-500 flex justify-center items-center">
                  <p className="text-white">{tasks.length}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AddTask;
