import bcrypt from "bcrypt";
import { PasswordHasher } from "../../domain/ports/password.hasher";

export class BcryptPasswordHasher implements PasswordHasher {
  constructor(private rounds: number = 10) {}
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.rounds);
  }
  async compare(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }
}
