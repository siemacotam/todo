import axios from "axios";
import { getHeaders } from "../get-headers";
import {
  CreateTaskPayload,
  DeleteTaskPayload,
  EditTaskPayload,
  ExtendedTask,
  GetTasksPayload,
} from "./types";

class TasksService {
  async create({
    pocketId,
    task,
  }: CreateTaskPayload): Promise<ExtendedTask | undefined> {
    const headers = getHeaders();

    const res = await axios.post(`api/pockets/${pocketId}/tasks`, task, {
      headers,
    });

    if (!res) return undefined;

    return res.data.data;
  }

  async get({
    pocketId,
  }: GetTasksPayload): Promise<ExtendedTask[] | undefined> {
    const headers = getHeaders();

    const res = await axios.get(`api/pockets/${pocketId}/tasks`, { headers });

    if (!res) return [];

    return res.data;
  }

  async update({
    pocketId,
    taskId,
    task,
  }: EditTaskPayload): Promise<boolean | undefined> {
    const headers = getHeaders();

    const res = await axios.put(
      `api/pockets/${pocketId}/tasks/${taskId}`,
      task,
      { headers }
    );

    if (!res) return false;

    // return res.data;
    return true;
  }

  async delete({
    pocketId,
    taskId,
  }: DeleteTaskPayload): Promise<boolean | undefined> {
    const headers = getHeaders();

    const res = await axios.delete(`api/pockets/${pocketId}/tasks/${taskId}`, {
      headers,
    });

    if (!res) return false;

    // return res.data;
    return true;
  }
}

const tasksService = new TasksService();

export default tasksService;
