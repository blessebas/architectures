import { Task } from "../entities/Task";

export interface TaskRepository {
  findById(id: string): Promise<Task | null>;
  list(ownerId?: string): Promise<Task[]>;
  save(task: Task): Promise<void>;
  delete(id: string): Promise<void>;
}
