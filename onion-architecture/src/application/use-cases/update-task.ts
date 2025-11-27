import { TaskRepository } from "../../domain/ports/task.repository";
import { TaskResponseDTO } from "../dtos/task.dto";
import { toTaskResponseDTO } from "../mappers/task.mapper";

export class UpdateTask {
  constructor(private repo: TaskRepository) {}
  async execute(id: string, data: { title?: string; description?: string; done?: boolean }): Promise<TaskResponseDTO> {
    const task = await this.repo.update(id, data);
    return toTaskResponseDTO(task);
  }
}
