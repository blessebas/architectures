import { UserRepository } from "../../domain/ports/user.repository";

export class DeleteUser {
  constructor(private repo: UserRepository) {}
  async execute(id: string): Promise<void> {
    const user = await this.repo.findById(id);
    if (!user) throw new Error("User not found");
    await this.repo.delete(id);
  }
}
