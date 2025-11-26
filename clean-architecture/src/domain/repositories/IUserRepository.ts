import { ICrudRepository } from "./ICrudRepository";
import { User } from "../entities/User";

export interface IUserRepository extends ICrudRepository<User, string> {
    findByEmail(email: string): Promise<User | null>;
}