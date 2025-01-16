import axios from "axios";
import { LoginPayload, RegisterPayload, RegisterResponse } from "./types";

class AuthService {
  async register(data: RegisterPayload): Promise<RegisterResponse | undefined> {
    const res = await axios.post("api/auth/register", data);

    if (!res) return undefined;

    return res.data;
  }

  async login(data: LoginPayload): Promise<RegisterResponse | undefined> {
    const res = await axios.post("api/auth/login", data);

    if (!res) return undefined;

    return res.data;
  }

  async logout(): Promise<boolean | undefined> {
    const res = await axios.post("api/auth/logout", {});

    if (!res) return false;

    return true;
  }
}

const authService = new AuthService();

export default authService;
