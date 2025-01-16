"use client";

import {
  getAuthDataFromLocalStorage,
  isTokenValid,
} from "@/services/local-storage";
import userService from "@/services/user/user.service";
import { useUserStore } from "@/stores/user-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FulscreenLoader from "./fulscreen-loader";

export const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  const { login } = useUserStore();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthDataFromLocalStorage();
      if (!token || !isTokenValid(token.token)) {
        router.push("/");
        setLoading(false);
        return;
      }

      if (token) {
        try {
          const userData = await userService.me();

          if (userData) {
            login(userData);
            setLoading(false);
            if (pathname.includes("/fill-page")) {
              return;
            }
            setLoading(false);
            router.push("/list");
          }
        } catch (error) {
          setLoading(false);
          console.log("Error fetching user data:", error);
          router.push("/");
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [router, login, pathname]);

  if (loading) return <FulscreenLoader />;

  return <>{children}</>;
};
