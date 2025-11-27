import { TaskRepository } from "../../domain/ports/task.repository";

export class DeleteTask {
  constructor(private repo: TaskRepository) {}
  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
