"use client";

import Image from "next/image";
import key from "@/assets/key.svg";
import plus from "@/assets/+.svg";
import { useTodoStore } from "@/stores/todo-store";

interface AddPocketButtonProps {
  expanded: boolean;
}

const AddPocketButton = ({ expanded }: AddPocketButtonProps) => {
  const { setDialogState } = useTodoStore();

  return (
    <>
      <div
        onClick={() => setDialogState("pocket")}
        className={`${
          expanded ? "hidden" : ""
        } md:hidden  h-[29px] w-[29px] m-[6px] rounded-full bg-gray-50 flex items-center justify-center mt-4`}
      >
        <Image height={18} width={9} src={plus} alt="plus" />
      </div>
      <div
        onClick={() => setDialogState("pocket")}
        className={`${
          expanded ? "flex" : "hidden"
        } md:flex items-center justify-between rounded-[2137px] p-2 bg-gray-50 cursor-pointer`}
      >
        <Image height={18} width={9} src={plus} alt="plus" />
        <p className="text-sm font-medium">Create new pocket</p>
        <div className="flex gap-2">
          <div className="flex items-center justify-center rounded-full bg-white h-[18px] w-[18px]">
            <Image height={14} width={14} src={key} alt="key" />
          </div>
          <p className="flex items-center text-xs justify-center rounded-full bg-white h-[18px] w-[18px]">
            P
          </p>
        </div>
      </div>
    </>
  );
};

export default AddPocketButton;
