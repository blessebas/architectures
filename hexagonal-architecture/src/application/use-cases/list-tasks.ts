import { TaskRepository } from "../../domain/ports/task.repository";
import { TaskResponseDTO } from "../dtos/task.dto";
import { toTaskResponseDTO } from "../mappers/task.mapper";

export class ListTasks {
  constructor(private repo: TaskRepository) {}
  async execute(ownerId?: string): Promise<TaskResponseDTO[]> {
    const tasks = await this.repo.list(ownerId);
    return tasks.map(toTaskResponseDTO);
  }
}
