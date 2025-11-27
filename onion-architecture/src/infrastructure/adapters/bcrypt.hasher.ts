import bcrypt from "bcrypt";
import { PasswordHasher } from "../../domain/ports/password.hasher";

export class BcryptPasswordHasher implements PasswordHasher {
  constructor(private rounds: number = 10) {}
  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.rounds);
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
