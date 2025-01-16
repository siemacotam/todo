"use client";

import Image from "next/image";
import avatar from "@/assets/avatar.svg";
import { useUserStore } from "@/stores/user-store";
import edit from "@/assets/edit.svg";
import UserDataDialog from "./user-data-dialog";
import { useAuth } from "@/hooks/useAuth";

interface UserDataProps {
  expanded: boolean;
}

const UserData = ({ expanded }: UserDataProps) => {
  const { user, toggleEditUserDialog, editUserDialog } = useUserStore();
  const { logOut } = useAuth({ setError: () => {} });

  if (!user) return null;
  const { firstName, lastName } = user;

  return (
    <div className="flex gap-3">
      <div
        className={`flex items-center justify-center  md:h-10 md:w-10 ${
          expanded ? "h-10 w-10" : "h-[29px] w-[29px]"
        } relative mx-[6px] md:m-0`}
      >
        <Image
          fill
          src={avatar}
          alt="Selected file preview"
          className="object-cover rounded-full"
        />
      </div>
      <div className={`${expanded ? "" : "hidden"} md:flex flex flex-col`}>
        <div className="flex gap-2 items-center">
          <p className="text-sm font-medium">
            {firstName} {lastName}
          </p>
          <div className="cursor-pointer" onClick={toggleEditUserDialog}>
            <Image height={12} width={12} src={edit} alt="edit icon" />
          </div>
        </div>
        <p
          onClick={logOut}
          className="text-xs text-gray-600 font-medium cursor-pointer hover:underline"
        >
          Log out
        </p>
      </div>
      {editUserDialog && <UserDataDialog open edit />}
    </div>
  );
};

export default UserData;
