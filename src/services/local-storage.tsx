import { jwtDecode } from "jwt-decode";

export type AuthData = {
  token: string;
};

interface JwtPayload {
  exp?: number;
}

const STORAGE_KEY = "todoapp-token";
const isBrowser = typeof window !== "undefined";

export const saveAuthDataToLocalStorage = async (
  authData: AuthData
): Promise<void> => {
  if (isBrowser) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
  }
};

export const getAuthDataFromLocalStorage = (): AuthData | null => {
  if (isBrowser) {
    const authDataString = localStorage.getItem(STORAGE_KEY);
    if (authDataString) {
      const authData: AuthData = JSON.parse(authDataString);
      return authData;
    }
  }
  return null;
};

export const clearAuthDataFromLocalStorage = (): void => {
  if (isBrowser) {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export const isTokenValid = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (!decodedToken.exp) {
      return false;
    }
    const expirationDate = new Date(decodedToken.exp * 1000);
    return expirationDate > new Date();
    // eslint-disable-next-line
  } catch (error) {
    return false;
  }
};
