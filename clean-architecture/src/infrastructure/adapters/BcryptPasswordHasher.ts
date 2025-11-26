import bcrypt from "bcrypt";
import { IPasswordHasher } from "../../application/ports/IPasswordHasher";

export class BcryptPasswordHasher implements IPasswordHasher {
    private rounds: number;
    constructor(rounds = 10) { this.rounds = rounds; }

    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.rounds);
    }

    async compare(password: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(password, hashed);
    }
}