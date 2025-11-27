import { TaskEntity } from "../entities/task.entity";

export interface TaskRepository {
  create(data: { title: string; description?: string; ownerId?: string | null }): Promise<TaskEntity>;
  update(id: string, data: { title?: string; description?: string; done?: boolean }): Promise<TaskEntity>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<TaskEntity | null>;
  list(ownerId?: string): Promise<TaskEntity[]>;
}
