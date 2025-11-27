import { TaskRepository } from "../../domain/ports/TaskRepository";
import { Task } from "../../domain/entities/Task";
import { v4 as uuidv4 } from "uuid";

export class CreateTask {
  constructor(private taskRepo: TaskRepository) {}
  async execute(input: { title: string; description?: string; ownerId?: string }) {
    const task = new Task(uuidv4(), input.title, input.description, false, input.ownerId);
    await this.taskRepo.save(task);
    return { id: task.id, title: task.title, description: task.description, done: task.done, ownerId: task.ownerId, createdAt: task.createdAt.toISOString() };
  }
}
