import { InMemoryCrudRepository } from "./InMemoryCrudRepository";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import { Task } from "../../domain/entities/Task";

export class InMemoryTaskRepository extends InMemoryCrudRepository<Task> implements ITaskRepository {
    async listByOwner(ownerId: string): Promise<Task[]> {
        return Array.from(this.items.values()).filter(t => t.ownerId === ownerId);
    }
}