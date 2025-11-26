import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { CreateTaskDTO } from "../../dtos/CreateTaskDTO";
import { Task } from "../../../domain/entities/Task";
import { v4 as uuidv4 } from "uuid";

export class CreateTaskUseCase {
  constructor(private taskRepo: ITaskRepository) {}
  async execute(input: CreateTaskDTO) {
    const task = new Task({ id: uuidv4(), title: input.title, description: input.description, ownerId: input.ownerId });
    await this.taskRepo.save(task);
    return { id: task.id, title: task.title, description: task.description, done: task.done, ownerId: task.ownerId, createdAt: task.createdAt.toISOString() };
  }
}