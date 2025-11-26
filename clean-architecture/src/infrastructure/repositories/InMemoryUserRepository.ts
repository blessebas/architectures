import { InMemoryCrudRepository } from "./InMemoryCrudRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

export class InMemoryUserRepository extends InMemoryCrudRepository<User> implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        for (const u of this.items.values()) {
            if (u.email === email.toLowerCase()) return u;
        }
        return null;
    }
}