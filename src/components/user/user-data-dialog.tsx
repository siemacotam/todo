"use client";

import { useUserStore } from "@/stores/user-store";
import Image from "next/image";
import passwordIcon from "@/assets/password.svg";
import { FormEvent, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const UserDataDialog = () => {
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { handleUpdateUserData } = useAuth({ setError });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  if (!user || (user.firstName && user.lastName)) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await handleUpdateUserData(e);

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-60 backdrop-blur-12px">
      <form onSubmit={handleSubmit}>
        <div className="w-full md:w-[586px] bg-white py-5 px-7 rounded-lg flex flex-col gap-2">
          <p className="text-2xl font-medium">Almost there! </p>
          <p className="text-sm font-medium">
            We just need some more information...
          </p>
          <div className="relative flex items-center">
            <input
              required
              type="text"
              name="firstName"
              placeholder="First name"
              className="px-2 py-3 text-sm text-black rounded bg-custom-gray border-gray-400 w-full outline-[#333]"
            />
          </div>
          <div className="relative flex items-center">
            <input
              required
              type="text"
              name="lastName"
              placeholder="Last name"
              className="px-2 py-3 text-sm text-black rounded bg-custom-gray border-gray-400 w-full outline-[#333]"
            />
          </div>
          <div className="relative flex items-center">
            <input
              required
              type="file"
              name="file"
              className="absolute opacity-0 cursor-pointer w-full h-full"
              onChange={handleFileChange}
            />
            <div className="mr-14 px-2 py-3 text-sm text-black rounded bg-custom-gray border-gray-400 w-full outline-[#333]">
              {selectedFile ? selectedFile.name : "Nie wybrano pliku"}
            </div>
            <div className="absolute right-0">
              {preview ? (
                <Image
                  height={38}
                  width={38}
                  src={preview}
                  alt="Selected file preview"
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-10 h-10 border border-gray-400 rounded-full">
                  <Image
                    height={30}
                    width={30}
                    src={passwordIcon}
                    alt="user icon"
                  />
                </div>
              )}
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            disabled={loading}
            className="w-28 bg-login-button text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            {loading ? (
              <div className="w-5 h-5 mx-auto border-4 border-blue-500 border-solid border-t-transparent border-t-4 rounded-full animate-spin" />
            ) : (
              "Let’s start!"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDataDialog;
