import prisma from "../infrastructure/prisma/client";

export interface CreateUserInput {
  name: string;
  email: string;
  passwordHash?: string;
}

export class UserModel {
  async create(input: CreateUserInput) {
    const p = await prisma.user.create({
      data: {
        name: input.name,
        email: input.email.toLowerCase(),
        passwordHash: input.passwordHash ?? null,
      },
    });
    return { id: p.id, name: p.name, email: p.email, createdAt: p.createdAt.toISOString() };
  }

  async findByEmail(email: string) {
    const p = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    return p ? { id: p.id, name: p.name, email: p.email, createdAt: p.createdAt.toISOString(), passwordHash: p.passwordHash ?? undefined } : null;
  }

  async findById(id: string) {
    const p = await prisma.user.findUnique({ where: { id } });
    return p ? { id: p.id, name: p.name, email: p.email, createdAt: p.createdAt.toISOString(), passwordHash: p.passwordHash ?? undefined } : null;
  }

  async list() {
    const ps = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    return ps.map((p) => ({ id: p.id, name: p.name, email: p.email, createdAt: p.createdAt.toISOString() }));
  }

  async delete(id: string) {
    await prisma.user.delete({ where: { id } });
  }
}
