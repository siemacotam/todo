"use client";

import Emoji from "./emoji/emoji";
import { useUserStore } from "@/stores/user-store";
import pocketsIcon from "@/assets/sidebar.svg";
import Image from "next/image";

interface PocketsProps {
  handleToggle: () => void;
  expanded: boolean;
}

const Pockets = ({ handleToggle, expanded }: PocketsProps) => {
  const { pockets, pickedPocket, setPickedPocked } = useUserStore();

  const width = expanded ? "h-full w-full" : "h-[29px] w-[29px]";

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className={`${expanded ? "" : "hidden"} text-2xl font-semibold`}>
          Pockets
        </p>
        <div
          onClick={handleToggle}
          className="md:hidden h-[29px] w-[29px] flex items-center justify-center mx-[6px] bg-gray-50 rounded-[5px] mb-2"
        >
          <Image src={pocketsIcon} height={16} width={16} alt="sidebar icon" />
        </div>
      </div>
      <ul
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        className="space-y-[12px] max-h-96 overflow-y-scroll scrollbar-hide p-[6px] md:p-0"
      >
        {pockets.map(({ _id, name, emoji, tasks }) => (
          <li
            onClick={() => setPickedPocked(_id)}
            className={`flex gap-4 ${
              pickedPocket === _id ? "bg-accent-600 text-white" : ""
            } p-[6px] md:p-2 rounded-[6px] items-center ${width} md:h-full md:w-full`}
            key={_id}
          >
            <div
              className={`${
                expanded ? "hidden" : ""
              } md:hidden h-[29px] w-[29px] flex items-center justify-center`}
            >
              <Emoji name={emoji} small />
            </div>
            <div className={`${expanded ? "" : "hidden"} md:block`}>
              <Emoji name={emoji} small />
            </div>
            <p
              className={`${
                expanded ? "" : "hidden"
              } md:block  text-sm font-medium flex-grow overflow-hidden whitespace-nowrap text-ellipsis`}
            >
              {name}
            </p>
            <div
              className={`${
                expanded ? "" : "hidden"
              } flex md:flex w-6 h-6 rounded-[4px] bg-accent-500  justify-center items-center`}
            >
              <p className="text-white">{tasks.length}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Pockets;
