export interface TaskCreateDto {
  title: string;
  description?: string | null;
}

export interface TaskUpdateDto {
  title?: string | null;
  description?: string | null;
}

export interface TaskResponse {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
}
