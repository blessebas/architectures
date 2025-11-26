import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.string().uuid().optional(), // si usas uuid
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string().meta({ format: "date-time" }),
});

export const idParamSchema = z.object({ id: z.string().uuid() });

export type UserResponse = z.infer<typeof userResponseSchema>;
