import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import { UpdateTaskDTO } from "../../dtos/UpdateTaskDTO";
import { DomainError } from "../../../domain/errors/DomainError";

export class UpdateTaskUseCase {
    constructor(private taskRepo: ITaskRepository) { }
    async execute(id: string, input: UpdateTaskDTO) {
        const task = await this.taskRepo.findById(id);
        if (!task) throw new DomainError('Task not found');
        if (input.title !== undefined) task.title = input.title;
        if (input.description !== undefined) task.description = input.description;
        if (input.done !== undefined) task.done = input.done;
        await this.taskRepo.save(task);
        return { id: task.id, title: task.title, description: task.description, done: task.done, ownerId: task.ownerId, createdAt: task.createdAt.toISOString() };
    }
}