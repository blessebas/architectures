import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { DomainError } from "../../../domain/errors/DomainError";

export class DeleteTaskUseCase {
  constructor(private taskRepo: ITaskRepository) {}
  async execute(id: string) {
    const task = await this.taskRepo.findById(id);
    if (!task) throw new DomainError('Task not found');
    await this.taskRepo.delete(id);
  }
}