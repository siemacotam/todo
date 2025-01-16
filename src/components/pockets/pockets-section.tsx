"use client";

import { useState } from "react";
import AddPocketButton from "../buttons/add-pocket-button";
import Pockets from "./pockets";
import UserData from "../user/user-data";

const PocketSection = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded((prev) => !prev);

  const width = expanded ? "fixed left-0 right-0 top-0 bottom-0 z-20 " : "";

  return (
    <div
      className={`flex flex-col ${width} h-full md:w-[274px] bg-white rounded-0 md:rounded-[14px] px-0 pt-8 pb-2 md:px-6 md:pt-10 md:pb-10 `}
    >
      <div className={`${expanded ? "p-2" : "p-0"} md:hidden flex-grow`}>
        <Pockets expanded={expanded} handleToggle={handleToggle} />
        <AddPocketButton expanded={expanded} />
      </div>
      <div className="hidden md:block flex-grow max-w-full  ">
        <p className="text-2xl font-semibold mb-4">Pockets</p>
        <div>
          <Pockets expanded={expanded} handleToggle={handleToggle} />
          <div className="mt-5">
            <AddPocketButton expanded={expanded} />
          </div>
        </div>
      </div>
      <UserData expanded={expanded} />
    </div>
  );
};

export default PocketSection;
