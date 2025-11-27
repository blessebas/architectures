import { v4 as uuidv4 } from "uuid";
import { TaskRepository } from "../../domain/ports/TaskRepository";
import { Task } from "../../domain/aggregates/Task";
import { TaskTitle } from "../../domain/value-objects/TaskTitle";

export class CreateTask {
  constructor(private repo: TaskRepository) {}
  async execute(input: { title: string; description?: string; ownerId?: string }) {
    const task = new Task(uuidv4(), new TaskTitle(input.title), input.description, false, input.ownerId);
    await this.repo.save(task);
    return { id: task.id, title: task.title, description: task.description, done: task.done, ownerId: task.ownerId, createdAt: task.createdAt.toISOString() };
  }
}
