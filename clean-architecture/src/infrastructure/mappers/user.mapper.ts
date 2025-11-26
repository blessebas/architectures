import { User as PrismaUser } from "@prisma/client";
import { User } from "../../domain/entities/User";

export const toDomainUser = (p: PrismaUser): User => {
  return new User({
    id: p.id,
    name: p.name,
    email: p.email,
    passwordHash: p.passwordHash ?? undefined,
    createdAt: p.createdAt,
  });
};

export const toPrismaUserCreate = (input: {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
}) => ({
  id: input.id,
  name: input.name,
  email: input.email.toLowerCase(),
  passwordHash: input.passwordHash ?? null,
});