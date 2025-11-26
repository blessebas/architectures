import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { DomainError } from "../../../domain/errors/DomainError";

export class GetUserUseCase {
    constructor(private userRepo: IUserRepository) { }
    async execute(id: string) {
        const user = await this.userRepo.findById(id);
        if (!user) throw new DomainError('User not found');
        return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt.toISOString() };
    }
}