import prisma from "../prisma/client";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import { Task } from "../../domain/entities/Task";
import { toDomainTask, toPrismaTaskCreate } from "../mappers/task.mapper";

export class PrismaTaskRepository implements ITaskRepository {
    async findById(id: string): Promise<Task | null> {
        const p = await prisma.task.findUnique({ where: { id } });
        if (!p) return null;
        return toDomainTask(p);
    }

    async list(): Promise<Task[]> {
        const ps = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
        return ps.map(toDomainTask);
    }

    async listByOwner(ownerId: string): Promise<Task[]> {
        const ps = await prisma.task.findMany({
            where: { ownerId },
            orderBy: { createdAt: "desc" },
        });
        return ps.map(toDomainTask);
    }

    async save(task: Task): Promise<void> {
        const data = toPrismaTaskCreate({
            id: task.id,
            title: task.title,
            description: task.description,
            done: task.done,
            ownerId: task.ownerId,
        });

        await prisma.task.upsert({
            where: { id: task.id },
            create: data,
            update: data,
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.task.delete({ where: { id } });
    }
}