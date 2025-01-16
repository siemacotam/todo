import { getAuthDataFromLocalStorage } from "./local-storage";

export const getHeaders = () => {
  const data = getAuthDataFromLocalStorage();

  console.log("data in getHeaders", data);

  let headers = {};

  if (data) {
    headers = {
      Authorization: `Bearer ${data.token}`,
    };
  }

  return headers;
};
