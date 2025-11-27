import { TaskRepository } from "../repositories/task.repository";
import { TaskResponseDTO } from "../dtos/task.dto";
import { toTaskResponseDTO } from "../mappers/task.mapper";

export class TaskService {
  constructor(private repo: TaskRepository = new TaskRepository()) {}

  async create(input: { title: string; description?: string; ownerId?: string }): Promise<TaskResponseDTO> {
    const task = await this.repo.create({ title: input.title, description: input.description, ownerId: input.ownerId ?? null });
    return toTaskResponseDTO(task);
  }

  async update(id: string, data: { title?: string; description?: string; done?: boolean }): Promise<TaskResponseDTO> {
    const task = await this.repo.update(id, data);
    return toTaskResponseDTO(task);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async findById(id: string): Promise<TaskResponseDTO | null> {
    const task = await this.repo.findById(id);
    return task ? toTaskResponseDTO(task) : null;
  }

  async list(ownerId?: string): Promise<TaskResponseDTO[]> {
    const tasks = await this.repo.list(ownerId);
    return tasks.map(toTaskResponseDTO);
  }
}
