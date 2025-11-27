import prisma from "../infrastructure/prisma/client";

export interface CreateTaskInput {
  title: string;
  description?: string;
  ownerId?: string | null;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  done?: boolean;
}

export class TaskModel {
  async create(input: CreateTaskInput) {
    const p = await prisma.task.create({
      data: {
        title: input.title,
        description: input.description ?? null,
        done: false,
        ownerId: input.ownerId ?? null,
      },
    });
    return { id: p.id, title: p.title, description: p.description ?? undefined, done: p.done, ownerId: p.ownerId ?? undefined, createdAt: p.createdAt.toISOString() };
  }

  async update(id: string, data: UpdateTaskInput) {
    const p = await prisma.task.update({ where: { id }, data });
    return { id: p.id, title: p.title, description: p.description ?? undefined, done: p.done, ownerId: p.ownerId ?? undefined, createdAt: p.createdAt.toISOString() };
  }

  async delete(id: string) {
    await prisma.task.delete({ where: { id } });
  }

  async findById(id: string) {
    const p = await prisma.task.findUnique({ where: { id } });
    return p ? { id: p.id, title: p.title, description: p.description ?? undefined, done: p.done, ownerId: p.ownerId ?? undefined, createdAt: p.createdAt.toISOString() } : null;
  }

  async list(ownerId?: string) {
    const ps = await prisma.task.findMany({ where: { ownerId: ownerId ?? undefined }, orderBy: { createdAt: "desc" } });
    return ps.map((p) => ({ id: p.id, title: p.title, description: p.description ?? undefined, done: p.done, ownerId: p.ownerId ?? undefined, createdAt: p.createdAt.toISOString() }));
  }
}
