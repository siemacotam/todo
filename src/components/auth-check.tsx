"use client";

import {
  getAuthDataFromLocalStorage,
  isTokenValid,
} from "@/services/local-storage";
import userService from "@/services/user/user.service";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { login } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthDataFromLocalStorage();
      if (!token || !isTokenValid(token.token)) {
        router.push("/");
        return;
      }

      if (token) {
        try {
          const userData = await userService.me();

          if (userData) {
            login(userData);
            router.push("/list");
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
          router.push("/");
        }
      }
    };

    checkAuth();
  }, [router, login]);

  return <>{children}</>;
};
