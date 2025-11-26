import { ITaskRepository } from "../../../domain/repositories/ITaskRepository";

export class ListTasksUseCase {
    constructor(private taskRepo: ITaskRepository) { }
    async execute(ownerId?: string) {
        if (ownerId) {
            const tasks = await this.taskRepo.listByOwner(ownerId);
            return tasks.map(t => ({ id: t.id, title: t.title, description: t.description, done: t.done, ownerId: t.ownerId, createdAt: t.createdAt.toISOString() }));
        }
        const tasks = await this.taskRepo.list();
        return tasks.map(t => ({ id: t.id, title: t.title, description: t.description, done: t.done, ownerId: t.ownerId, createdAt: t.createdAt.toISOString() }));
    }
}