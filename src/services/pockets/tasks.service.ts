import axios from "axios";
import { getHeaders } from "../get-headers";
import {
  CreatePocketPayload,
  DeletePocketPayload,
  EditPocketPayload,
  ExtendedPocket,
} from "./types";

class PocketsService {
  async create({
    pocket,
  }: CreatePocketPayload): Promise<ExtendedPocket | undefined> {
    const headers = getHeaders();

    const res = await axios.post(`api/pockets`, pocket, { headers });

    if (!res) return undefined;

    return res.data.data;
  }

  async get(): Promise<ExtendedPocket[] | undefined> {
    const headers = getHeaders();

    const res = await axios.get(`api/pockets`, { headers });

    if (!res) return [];

    return res.data;
  }

  async update({
    id,
    pocket,
  }: EditPocketPayload): Promise<boolean | undefined> {
    const headers = getHeaders();

    const res = await axios.put(`api/pockets/${id}`, pocket, { headers });

    if (!res) return false;

    return true;
  }

  async delete({ id }: DeletePocketPayload): Promise<boolean | undefined> {
    const headers = getHeaders();

    const res = await axios.delete(`api/pockets/${id}`, { headers });

    if (!res) return false;

    return true;
  }
}

const pocketsService = new PocketsService();

export default pocketsService;
