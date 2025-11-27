import prisma from "../infrastructure/prisma/client";
import { TaskEntity } from "../domain/task.entity";

export class TaskRepository {
  async create(data: { title: string; description?: string; ownerId?: string | null }): Promise<TaskEntity> {
    const p = await prisma.task.create({
      data: { title: data.title, description: data.description ?? null, done: false, ownerId: data.ownerId ?? null },
    });
    return new TaskEntity(p.id, p.title, p.description ?? undefined, p.done, p.ownerId ?? undefined, p.createdAt);
  }

  async update(id: string, data: { title?: string; description?: string; done?: boolean }): Promise<TaskEntity> {
    const p = await prisma.task.update({ where: { id }, data });
    return new TaskEntity(p.id, p.title, p.description ?? undefined, p.done, p.ownerId ?? undefined, p.createdAt);
  }

  async delete(id: string): Promise<void> {
    await prisma.task.delete({ where: { id } });
  }

  async findById(id: string): Promise<TaskEntity | null> {
    const p = await prisma.task.findUnique({ where: { id } });
    return p ? new TaskEntity(p.id, p.title, p.description ?? undefined, p.done, p.ownerId ?? undefined, p.createdAt) : null;
  }

  async list(ownerId?: string): Promise<TaskEntity[]> {
    const ps = await prisma.task.findMany({ where: { ownerId: ownerId ?? undefined }, orderBy: { createdAt: "desc" } });
    return ps.map((p) => new TaskEntity(p.id, p.title, p.description ?? undefined, p.done, p.ownerId ?? undefined, p.createdAt));
  }
}
