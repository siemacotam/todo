"use client";

import Image from "next/image";
import userIcon from "@/assets/ph_user.svg";
import passwordIcon from "@/assets/password.svg";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user-store";
import { useAuth } from "@/hooks/useAuth";

interface LoginPanelProps {
  registerPage: boolean;
}

const LoginPanel = ({ registerPage }: LoginPanelProps) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleLogin, handleRegister } = useAuth({ setError });
  const { isLoggedIn } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/list");
    }
  }, [router, isLoggedIn]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!registerPage) {
      await handleLogin(e);
    } else {
      await handleRegister(e);
    }
    setLoading(false);
  };

  const title = registerPage ? "Register" : "Login";
  const subtitle = registerPage
    ? "Have account already? "
    : "Don't have account? ";
  const ctaLabel = registerPage ? " Login" : " Register";

  const handleNavigate = () => router.push(registerPage ? "/" : "/register");

  return (
    <div className="py-44 md:px-14 px-5 max-w-lg w-full">
      <form onSubmit={handleSubmit}>
        <p className="font-roboto text-4xl font-bold leading-[37.5px]">
          {title}
        </p>
        <div className="flex flex-col gap-3 my-6">
          <div className="relative flex items-center">
            <input
              required
              type="text"
              name="login"
              placeholder="Username"
              className="pr-4 pl-14 py-3 text-sm text-black rounded bg-custom-gray  border-gray-400 w-full outline-[#333]"
            />

            <div className="absolute left-4">
              <Image height={20} width={20} src={userIcon} alt="user icon" />
            </div>
          </div>
          <div className="relative flex items-center">
            <input
              required
              type="text"
              name="password"
              placeholder="Password"
              className="pr-4 pl-14 py-3 text-sm text-black rounded bg-custom-gray  border-gray-400 w-full outline-[#333]"
            />

            <div className="absolute left-4">
              <Image
                height={20}
                width={20}
                src={passwordIcon}
                alt="user icon"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {error && <p className="text-red-500">{error}</p>}
            <button
              disabled={loading}
              className="w-28 bg-login-button text-white py-3 px-4 rounded-lg hover:bg-blue-600"
            >
              {loading ? (
                <div className="w-5 h-5 mx-auto border-4 border-blue-500 border-solid border-t-transparent border-t-4 rounded-full animate-spin" />
              ) : (
                title
              )}
            </button>
          </div>
        </div>

        <p>
          {subtitle}
          <span
            onClick={handleNavigate}
            className="text-login-button cursor-pointer"
          >
            {ctaLabel}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPanel;
