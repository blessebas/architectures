import { UserRepository } from "../../domain/ports/UserRepository";

export class ListUsers {
  constructor(private userRepo: UserRepository) {}
  async execute() {
    const users = await this.userRepo.list();
    return users.map((u) => ({ id: u.id, name: u.name, email: u.email, createdAt: u.createdAt.toISOString() }));
  }
}
