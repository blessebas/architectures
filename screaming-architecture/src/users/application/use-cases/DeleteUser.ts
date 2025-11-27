import { UserRepository } from "../../domain/ports/UserRepository";

export class DeleteUser {
  constructor(private userRepo: UserRepository) {}
  async execute(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error("User not found");
    await this.userRepo.delete(id);
  }
}
