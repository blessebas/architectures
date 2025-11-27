import { TaskRepository } from "../../domain/ports/TaskRepository";

export class ListTasks {
  constructor(private taskRepo: TaskRepository) {}
  async execute(ownerId?: string) {
    const tasks = await this.taskRepo.list(ownerId);
    return tasks.map((t) => ({ id: t.id, title: t.title, description: t.description, done: t.done, ownerId: t.ownerId, createdAt: t.createdAt.toISOString() }));
  }
}
