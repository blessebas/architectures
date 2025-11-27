import prisma from "../../../shared/infrastructure/prisma/client";
import { TaskRepository } from "../../domain/ports/TaskRepository";
import { Task } from "../../domain/aggregates/Task";
import { TaskTitle } from "../../domain/value-objects/TaskTitle";

export class PrismaTaskRepository implements TaskRepository {
  async findById(id: string): Promise<Task | null> {
    const p = await prisma.task.findUnique({ where: { id } });
    if (!p) return null;
    return new Task(p.id, new TaskTitle(p.title), p.description ?? undefined, p.done, p.ownerId ?? undefined, p.createdAt);
  }
  async list(ownerId?: string): Promise<Task[]> {
    const ps = await prisma.task.findMany({ where: { ownerId: ownerId ?? undefined }, orderBy: { createdAt: "desc" } });
    return ps.map((p) => new Task(p.id, new TaskTitle(p.title), p.description ?? undefined, p.done, p.ownerId ?? undefined, p.createdAt));
  }
  async save(task: Task): Promise<void> {
    await prisma.task.upsert({
      where: { id: task.id },
      create: { id: task.id, title: task.title, description: task.description ?? null, done: task.done, ownerId: task.ownerId ?? null },
      update: { title: task.title, description: task.description ?? null, done: task.done, ownerId: task.ownerId ?? null },
    });
  }
  async delete(id: string): Promise<void> {
    await prisma.task.delete({ where: { id } });
  }
}
