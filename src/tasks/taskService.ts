import { fetchClient } from "@/api";
import type { TaskCreateDto, TaskUpdateDto, TaskResponse } from "./task";

export const taskService = {
  async getTasks(): Promise<TaskResponse[]> {
    return fetchClient<TaskResponse[]>("/tasks/");
  },
  async getTask(id: number): Promise<TaskResponse> {
    return fetchClient<TaskResponse>(`/tasks/${id}`);
  },

  async createTask(data: TaskCreateDto): Promise<TaskResponse> {
    return fetchClient<TaskResponse>("/tasks/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateTask(id: number, data: TaskUpdateDto): Promise<TaskResponse> {
    return fetchClient<TaskResponse>(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async deleteTask(id: number): Promise<void> {
    await fetchClient<void>(`/tasks/${id}`, {
      method: "DELETE",
    });
  },
};
