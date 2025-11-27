import prisma from "../../../shared/infrastructure/prisma/client";
import { UserRepository } from "../../domain/ports/UserRepository";
import { User } from "../../domain/entities/User";

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const p = await prisma.user.findUnique({ where: { id } });
    if (!p) return null;
    return new User(p.id, p.name, p.email, p.passwordHash ?? undefined, p.createdAt);
  }
  async findByEmail(email: string): Promise<User | null> {
    const p = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!p) return null;
    return new User(p.id, p.name, p.email, p.passwordHash ?? undefined, p.createdAt);
  }
  async list(): Promise<User[]> {
    const ps = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    return ps.map((p) => new User(p.id, p.name, p.email, p.passwordHash ?? undefined, p.createdAt));
  }
  async save(user: User): Promise<void> {
    await prisma.user.upsert({
      where: { id: user.id },
      create: { id: user.id, name: user.name, email: user.email.toLowerCase(), passwordHash: user.passwordHash ?? null },
      update: { name: user.name, email: user.email.toLowerCase(), passwordHash: user.passwordHash ?? null },
    });
  }
  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
