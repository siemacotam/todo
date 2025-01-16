import { getAuthDataFromLocalStorage } from "./local-storage";

export const getHeaders = () => {
  const data = getAuthDataFromLocalStorage();

  let headers = {};

  if (data) {
    headers = {
      Authorization: `Bearer ${data.token}`,
    };
  }

  return headers;
};
