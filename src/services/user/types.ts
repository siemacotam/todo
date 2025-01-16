import { AxiosResponse } from "../types";

export interface UserUpdatePayload extends AxiosResponse {
  firstName: string;
  lastName: string;
}

export interface LoginResponse extends AxiosResponse {
  data: { token: string };
}
