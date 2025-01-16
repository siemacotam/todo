import { NextRequest } from "next/server";

export const getAuthHeaders = (request: NextRequest) => {
  const authHeader = request.headers.get("Authorization");
  const headers = {
    "Content-Type": "application/json",
    Authorization: authHeader,
  };
  return { headers };
};
