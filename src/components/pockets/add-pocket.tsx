"use client";

import { useTodoStore } from "@/stores/todo-store";
import Image from "next/image";
import arrow from "@/assets/arrow-left.svg";
import pocketsService from "@/services/pockets/tasks.service";
import { FormEvent, useState } from "react";
import { useUserStore } from "@/stores/user-store";
import { useEmojis } from "@/hooks/useEmojis";
import EmojiPicker from "../emoji/emoji-picker";
import Emoji from "../emoji/emoji";

const AddPocket = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    setDialogState,
    resetPocketState,
    pocket: { emoji },
  } = useTodoStore();
  const { addPocket } = useUserStore();
  const { list } = useEmojis();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("pocketName") as string;
    const props = {
      emoji,
      name,
    };

    if (!name || !emoji) {
      setError("Name and emoji are required");
      return;
    }

    setLoading(true);

    const res = await pocketsService.create({ pocket: props }).catch((err) => {
      setError(err?.response?.data?.message ?? "");
    });

    if (res) {
      addPocket(res);
      setDialogState("closed");
      resetPocketState();
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <button
        type="button"
        className="mb-3"
        onClick={() => setDialogState("closed")}
      >
        <div className="flex gap-2">
          <Image height={16} width={16} alt="arrow" src={arrow} />
          <p className=" text-accent font-medium text-sm text-accent-600">
            Go back
          </p>
        </div>
      </button>
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <input
            type="text"
            name="pocketName"
            placeholder="Pocket name"
            className="pr-4 pl-14 py-2 h-[40px] text-sm text-black rounded bg-gray-50  border-gray-400 w-full focus:outline-none"
          />
          <div className="absolute left-4">
            <Emoji name={emoji} />
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
      <p className="text-sm font-medium my-3">Select Emoji</p>
      {list.length > 0 && <EmojiPicker list={list} />}
    </div>
  );
};

export default AddPocket;
