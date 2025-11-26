import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    // ownerId SHOULD NOT be provided by client if you want to take it from token;
    // si permites, valida UUID:
    ownerId: z.string().uuid().optional(),
});

export const updateTaskSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    done: z.boolean().optional(),
});

export const listTasksQuerySchema = z.object({
    ownerId: z.string().uuid().optional(),
});

export const taskResponseSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string(),
    description: z.string().nullable().optional(),
    done: z.boolean(),
    ownerId: z.string().uuid().nullable().optional(),
    createdAt: z.string().meta({ format: "date-time" }),
});

export type TaskResponse = z.infer<typeof taskResponseSchema>;

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type ListTasksQuery = z.infer<typeof listTasksQuerySchema>;
