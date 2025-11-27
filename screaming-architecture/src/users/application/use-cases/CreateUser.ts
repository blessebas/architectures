import { UserRepository } from "../../domain/ports/UserRepository";
import { User } from "../../domain/entities/User";
import { v4 as uuidv4 } from "uuid";
import { BcryptPasswordHasher } from "../../../auth/adapters/outbound/bcrypt.hasher";

export class CreateUser {
  constructor(private userRepo: UserRepository, private hasher: BcryptPasswordHasher) {}
  async execute(input: { name: string; email: string; password: string }) {
    const existing = await this.userRepo.findByEmail(input.email.toLowerCase());
    if (existing) throw new Error("Email already in use");
    const passwordHash = await this.hasher.hash(input.password);
    const user = new User(uuidv4(), input.name, input.email, passwordHash, new Date());
    await this.userRepo.save(user);
    return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt.toISOString() };
  }
}
