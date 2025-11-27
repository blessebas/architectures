import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "../../domain/ports/UserRepository";
import { PasswordHasher } from "../../../auth/domain/ports/PasswordHasher";
import { Email } from "../../domain/value-objects/Email";
import { User } from "../../domain/aggregates/User";

export class RegisterUser {
  constructor(private repo: UserRepository, private hasher: PasswordHasher) {}
  async execute(input: { name: string; email: string; password: string }) {
    const email = new Email(input.email);
    const existing = await this.repo.findByEmail(email);
    if (existing) throw new Error("Email already in use");
    const hash = await this.hasher.hash(input.password);
    const user = new User(uuidv4(), input.name, email, hash, new Date());
    await this.repo.save(user);
    return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt.toISOString() };
  }
}
