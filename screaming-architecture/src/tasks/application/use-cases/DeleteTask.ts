import { TaskRepository } from "../../domain/ports/TaskRepository";

export class DeleteTask {
  constructor(private taskRepo: TaskRepository) {}
  async execute(id: string) {
    const task = await this.taskRepo.findById(id);
    if (!task) throw new Error("Task not found");
    await this.taskRepo.delete(id);
  }
}
