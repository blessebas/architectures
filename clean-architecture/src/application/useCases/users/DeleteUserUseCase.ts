import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { DomainError } from "../../../domain/errors/DomainError";

export class DeleteUserUseCase {
  constructor(private userRepo: IUserRepository) {}
  async execute(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new DomainError('User not found');
    await this.userRepo.delete(id);
  }
}