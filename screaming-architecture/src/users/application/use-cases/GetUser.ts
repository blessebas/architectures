import { UserRepository } from "../../domain/ports/UserRepository";

export class GetUser {
  constructor(private userRepo: UserRepository) {}
  async execute(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error("User not found");
    return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt.toISOString() };
  }
}
