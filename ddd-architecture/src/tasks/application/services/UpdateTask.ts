import { TaskRepository } from "../../domain/ports/TaskRepository";
import { TaskTitle } from "../../domain/value-objects/TaskTitle";

export class UpdateTask {
  constructor(private repo: TaskRepository) {}
  async execute(id: string, input: { title?: string; description?: string; done?: boolean }) {
    const task = await this.repo.findById(id);
    if (!task) throw new Error("Task not found");
    if (typeof input.title === "string") task.rename(new TaskTitle(input.title));
    if (typeof input.description === "string") task.changeDescription(input.description);
    if (typeof input.done === "boolean") input.done ? task.complete() : task.reopen();
    await this.repo.save(task);
    return { id: task.id, title: task.title, description: task.description, done: task.done, ownerId: task.ownerId, createdAt: task.createdAt.toISOString() };
  }
}
