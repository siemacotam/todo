"use client";

import Image from "next/image";
import AddPocket from "./add-pocket";
import AddTask from "./add-task";
import { useTodoStore } from "@/stores/todo-store";
import key from "@/assets/key-white.svg";
import down from "@/assets/down.svg";
import up from "@/assets/up.svg";
import AddDialog from "./add-dialog";

const Actions = () => {
  const { dialog, setDialogState } = useTodoStore();

  const isDialogOpen = dialog !== "closed";

  const bgColor = isDialogOpen ? "bg-accent-600" : "bg-gray-900";
  const iconsBgColor = isDialogOpen ? "bg-accent-700" : "bg-gray-700";
  const arrowSrc = isDialogOpen ? down : up;
  const arrowAlt = isDialogOpen ? "down icon" : "up icon";
  const hoverColor = isDialogOpen ? "hover:bg-accent-800" : "hover:bg-black";

  const handleAction = () => {
    if (dialog === "closed" || dialog === "pocket") {
      setDialogState("task");
    }
    if (dialog === "task") {
      setDialogState("closed");
    }
  };

  return (
    <>
      {isDialogOpen && (
        <AddDialog>
          {dialog === "pocket" && <AddPocket />}
          {dialog === "task" && <AddTask />}
        </AddDialog>
      )}
      <div
        onClick={handleAction}
        className={`md:hidden fixed right-2 bottom-2 h-11 w-11 flex items-center justify-center rounded-full ${bgColor}`}
      >
        <Image height={16} width={16} src={arrowSrc} alt={arrowAlt} />
      </div>
      <div className="hidden md:block fixed bottom-2 left-1/2 transform -translate-x-1/2 w-[400px]">
        <button
          onClick={handleAction}
          className={`w-full ${bgColor} ${hoverColor} rounded-[35px] p-2 pl-4 text-white`}
        >
          <div className="flex items-center gap-2">
            <Image height={16} width={16} src={arrowSrc} alt={arrowAlt} />
            <p className="flex-grow text-left">Create new task</p>
            <div className="flex gap-1">
              <div
                className={`flex items-center justify-center h-8 w-8 ${iconsBgColor} rounded-full`}
              >
                <Image height={16} width={16} src={key} alt="key icon" />
              </div>
              <div
                className={`flex items-center justify-center h-8 w-8 ${iconsBgColor} rounded-full`}
              >
                <p>N</p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default Actions;
