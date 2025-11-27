import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
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
