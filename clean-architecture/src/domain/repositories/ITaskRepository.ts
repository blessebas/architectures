import { ICrudRepository } from "./ICrudRepository";
import { Task } from "../entities/Task";

export interface ITaskRepository extends ICrudRepository<Task, string> {
  listByOwner(ownerId: string): Promise<Task[]>;
}