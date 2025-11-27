import { TaskRepository } from "../../domain/ports/TaskRepository";

export class ListTasks {
  constructor(private repo: TaskRepository) {}
  async execute(ownerId?: string) {
    const tasks = await this.repo.list(ownerId);
    return tasks.map((t) => ({ id: t.id, title: t.title, description: t.description, done: t.done, ownerId: t.ownerId, createdAt: t.createdAt.toISOString() }));
  }
}
