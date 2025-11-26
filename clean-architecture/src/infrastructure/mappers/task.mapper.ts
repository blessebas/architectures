import { Task as PrismaTask } from "@prisma/client";
import { Task } from "../../domain/entities/Task";

export const toDomainTask = (p: PrismaTask): Task => {
    return new Task({
        id: p.id,
        title: p.title,
        description: p.description ?? undefined,
        done: p.done,
        ownerId: p.ownerId ?? undefined,
        createdAt: p.createdAt,
    });
};

export const toPrismaTaskCreate = (input: {
    id: string;
    title: string;
    description?: string;
    done?: boolean;
    ownerId?: string;
}) => ({
    id: input.id,
    title: input.title,
    description: input.description ?? null,
    done: input.done ?? false,
    ownerId: input.ownerId ?? null,
});