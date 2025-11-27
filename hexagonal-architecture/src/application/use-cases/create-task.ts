import { TaskRepository } from "../../domain/ports/task.repository";
import { TaskResponseDTO } from "../dtos/task.dto";
import { toTaskResponseDTO } from "../mappers/task.mapper";

export class CreateTask {
  constructor(private repo: TaskRepository) {}
  async execute(input: { title: string; description?: string; ownerId?: string }): Promise<TaskResponseDTO> {
    const task = await this.repo.create({ title: input.title, description: input.description, ownerId: input.ownerId ?? null });
    return toTaskResponseDTO(task);
  }
}
