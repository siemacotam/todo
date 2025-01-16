import { User } from "@/stores/user-store";
import axios from "axios";
import { getHeaders } from "../get-headers";
import { UserUpdatePayload } from "./types";
import { AxiosResponse } from "../types";

class UserService {
  async me(): Promise<User | undefined> {
    const headers = getHeaders();

    const res = await axios.get("api/users/me", { headers });

    if (!res) return undefined;

    return res.data;
  }

  async update(data: UserUpdatePayload): Promise<AxiosResponse | undefined> {
    const headers = getHeaders();

    const res = await axios.put("api/users/update", data, { headers });

    if (!res) return {};

    return res.data;
  }

  async avatar(): Promise<boolean | undefined> {
    const headers = getHeaders();

    const res = await axios.put("api/users/avatar", {}, { headers });

    if (!res) return false;

    return true;
  }
}

const userService = new UserService();

export default userService;
