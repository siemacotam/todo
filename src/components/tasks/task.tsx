"use client";

import { ExtendedTask } from "@/services/tasks/types";
import Image from "next/image";
import dots from "@/assets/dots-black.svg";
import dotsDone from "@/assets/dots-done.svg";
import rectangle from "@/assets/rectangle-white.svg";
import rectangleDone from "@/assets/rectangle.svg";
import { useState } from "react";
import { useUserStore } from "@/stores/user-store";
import tasksService from "@/services/tasks/tasks.service";
import DeleteButton from "../buttons/delete-button";

interface TaskProps {
  task: ExtendedTask;
  setTasks: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskElement = ({ task, setTasks, deleteTask }: TaskProps) => {
  const [showBtn, setShowBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const { pickedPocket, removeTask } = useUserStore();
  const { _id, description, isCompleted } = task;

  const handleDeleteTask = async () => {
    setLoading(true);
    const res = await tasksService
      .delete({ pocketId: pickedPocket, taskId: _id })
      .catch((err) => {
        console.log(err);
      });

    if (res) {
      deleteTask(_id);
      removeTask(pickedPocket, _id);
    }

    setLoading(false);
  };

  const toggleCompleted = async () => {
    setLoading(true);
    const props = {
      pocketId: pickedPocket,
      taskId: task._id,
      task: {
        description: task.description,
        isCompleted: !task.isCompleted,
      },
    };

    const res = await tasksService.update(props).catch((err) => {
      console.log(err);
    });

    if (res) {
      setTasks(_id);
    }

    setLoading(false);
  };

  return (
    <>
      <li
        className={`flex justify-between rounded-[6px] p-1 pl-2 hover:bg-gray-100  ${
          isCompleted ? "bg-accent-600 text-white" : "bg-white"
        }`}
      >
        <button disabled={loading} className="flex gap-2 items-center ">
          <Image
            src={isCompleted ? rectangleDone : rectangle}
            height={24}
            onClick={toggleCompleted}
            width={24}
            className="cursor-pointer"
            alt="rectangle icon"
          />
          <p className={`text-sm ${isCompleted ? "line-through" : ""}`}>
            {description}
          </p>
        </button>
        <div
          onClick={() => setShowBtn((prev) => !prev)}
          className={`h-[30px] w-[30px] rounded-[4px] cursor-pointer ${
            isCompleted
              ? showBtn
                ? "bg-accent-400"
                : "bg-accent-500"
              : showBtn
              ? "bg-gray-100"
              : "bg-gray-50"
          } flex items-center justify-center`}
        >
          <Image
            src={isCompleted ? dotsDone : dots}
            height={14}
            width={14}
            alt="dots icon"
          />{" "}
        </div>
      </li>
      {showBtn && (
        <li className="flex justify-end">
          <DeleteButton loading={loading} handleClick={handleDeleteTask} />
        </li>
      )}
    </>
  );
};

export default TaskElement;
