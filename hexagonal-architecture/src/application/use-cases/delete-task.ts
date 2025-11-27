import { TaskRepository } from "../../domain/ports/task.repository";

export class DeleteTask {
  constructor(private repo: TaskRepository) {}
  async execute(id: string): Promise<void> {
    const task = await this.repo.findById(id);
    if (!task) throw new Error("Task not found");
    await this.repo.delete(id);
  }
}
