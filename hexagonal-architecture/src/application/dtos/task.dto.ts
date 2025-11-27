export type TaskResponseDTO = {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  ownerId?: string;
  createdAt: string;
};
