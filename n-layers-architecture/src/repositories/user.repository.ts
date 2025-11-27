import prisma from "../infrastructure/prisma/client";
import { UserEntity } from "../domain/user.entity";

export class UserRepository {
  async create(data: { name: string; email: string; passwordHash?: string }): Promise<UserEntity> {
    const p = await prisma.user.create({
      data: { name: data.name, email: data.email.toLowerCase(), passwordHash: data.passwordHash ?? null },
    });
    return new UserEntity(p.id, p.name, p.email, p.passwordHash ?? undefined, p.createdAt);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const p = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    return p ? new UserEntity(p.id, p.name, p.email, p.passwordHash ?? undefined, p.createdAt) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const p = await prisma.user.findUnique({ where: { id } });
    return p ? new UserEntity(p.id, p.name, p.email, p.passwordHash ?? undefined, p.createdAt) : null;
  }

  async list(): Promise<UserEntity[]> {
    const ps = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    return ps.map((p) => new UserEntity(p.id, p.name, p.email, p.passwordHash ?? undefined, p.createdAt));
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
