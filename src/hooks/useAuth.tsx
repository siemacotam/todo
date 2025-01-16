import authService from "@/services/auth/auth.service";
import {
  clearAuthDataFromLocalStorage,
  saveAuthDataToLocalStorage,
} from "@/services/local-storage";
import userService from "@/services/user/user.service";
import { useUserStore } from "@/stores/user-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

interface UseAuthProps {
  setError: (data: string) => void;
}

export const useAuth = ({ setError }: UseAuthProps) => {
  const router = useRouter();
  const { login, setUser, logout } = useUserStore();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      login: formData.get("login") as string,
      password: formData.get("password") as string,
    };

    try {
      const response = await authService.login(data);

      if (response && response.success) {
        await saveAuthDataToLocalStorage({ token: response.data.token });

        const userData = await userService.me();

        if (userData) {
          login(userData);
          router.push("list");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        setError(
          axiosError.response?.data?.message || "An unknown error occurred."
        );
      } else {
        setError("An unknown error occurred.");
      }
      console.log("Błąd logowania:", error);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      login: formData.get("login") as string,
      password: formData.get("password") as string,
      firstName: "",
      lastName: "",
    };

    try {
      const response = await authService.register(data);

      if (response && response.success) {
        await saveAuthDataToLocalStorage({ token: response.data.token });

        const userData = await userService.me();

        if (userData) {
          login(userData);
          router.push("fill-page");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        setError(
          axiosError.response?.data?.message || "An unknown error occurred."
        );
      } else {
        setError("An unknown error occurred.");
      }
      console.log("Błąd rejestracji:", error);
    }
  };

  const handleUpdateUserData = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.target as HTMLFormElement);

    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
    };

    if (!data.firstName || !data.lastName) {
      setError("Name and lastname are required");
    }
    try {
      const response = await userService.update(data);

      if (response && response.success) {
        setUser(data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        setError(
          axiosError.response?.data?.message || "An unknown error occurred."
        );
      } else {
        setError("An unknown error occurred.");
      }
      console.log("Błąd rejestracji:", error);
    }
  };

  const logOut = async () => {
    await authService.logout();
    logout();
    clearAuthDataFromLocalStorage();
    router.push("/");
  };

  return { handleLogin, handleRegister, handleUpdateUserData, logOut };
};
