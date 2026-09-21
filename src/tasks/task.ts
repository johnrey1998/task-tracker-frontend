export interface TaskCreateDTO {
  title: string;
  description?: string | null;
}

export interface TaskUpdateDTO {
  title?: string | null;
  description?: string | null;
}

export interface TaskResponse {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
}
