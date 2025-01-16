"use client";

import Image from "next/image";
import avatar from "@/assets/avatar.svg";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "next/navigation";
import { clearAuthDataFromLocalStorage } from "@/services/local-storage";

interface UserDataProps {
  expanded: boolean;
}

const UserData = ({ expanded }: UserDataProps) => {
  const { user, logout } = useUserStore();
  const router = useRouter();

  if (!user) return null;
  const { firstName, lastName } = user;

  const logOut = () => {
    logout();
    clearAuthDataFromLocalStorage();
    router.push("/");
  };

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
        <p className="text-sm font-medium">
          {firstName} {lastName}
        </p>
        <p
          onClick={logOut}
          className="text-xs text-gray-600 font-medium cursor-pointer hover:underline"
        >
          Log out
        </p>
      </div>
    </div>
  );
};

export default UserData;
