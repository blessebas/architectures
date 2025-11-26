import prisma from "../prisma/client";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { toDomainUser, toPrismaUserCreate } from "../mappers/user.mapper";

export class PrismaUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const p = await prisma.user.findUnique({ where: { id } });
    if (!p) return null;
    return toDomainUser(p);
  }

  async findByEmail(email: string): Promise<User | null> {
    const p = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!p) return null;
    return toDomainUser(p);
  }

  async list(): Promise<User[]> {
    const ps = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    return ps.map(toDomainUser);
  }

  async save(user: User): Promise<void> {
    // Upsert behaviour: si existe, update; si no, create.
    // Si prefieres simple create/update separado, ajusta.
    try {
      const data = toPrismaUserCreate({
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: (user as any).passwordHash, // si existe
      });

      await prisma.user.upsert({
        where: { id: user.id },
        create: data,
        update: data,
      });
    } catch (e: any) {
      // Opcional: mapear errores de Prisma a errores de dominio
      throw e;
    }
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}