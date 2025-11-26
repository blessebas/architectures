import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class ListUsersUseCase {
    constructor(private userRepo: IUserRepository) { }
    async execute() {
        const users = await this.userRepo.list();
        return users.map(u => ({ id: u.id, name: u.name, email: u.email, createdAt: u.createdAt.toISOString() }));
    }
}