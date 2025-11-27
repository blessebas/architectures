import { TaskRepository } from "../../domain/ports/TaskRepository";

export class UpdateTask {
  constructor(private taskRepo: TaskRepository) {}
  async execute(id: string, input: { title?: string; description?: string; done?: boolean }) {
    const task = await this.taskRepo.findById(id);
    if (!task) throw new Error("Task not found");
    if (typeof input.title === "string") task.title = input.title;
    if (typeof input.description === "string") task.description = input.description;
    if (typeof input.done === "boolean") task.done = input.done;
    await this.taskRepo.save(task);
    return { id: task.id, title: task.title, description: task.description, done: task.done, ownerId: task.ownerId, createdAt: task.createdAt.toISOString() };
  }
}
