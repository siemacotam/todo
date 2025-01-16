import { AxiosResponse } from "../types";

export type RegisterPayload = {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type LoginPayload = {
  login: string;
  password: string;
};

export interface RegisterResponse extends AxiosResponse {
  data: { token: string };
}
