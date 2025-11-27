import { UserRepository } from "../../../users/domain/ports/UserRepository";
import { PasswordHasher } from "../../domain/ports/PasswordHasher";
import { TokenService } from "../../domain/ports/TokenService";
import { Email } from "../../../users/domain/value-objects/Email";

export class Login {
  constructor(private repo: UserRepository, private hasher: PasswordHasher, private tokens: TokenService) {}
  async execute(input: { email: string; password: string }) {
    const email = new Email(input.email);
    const user = await this.repo.findByEmail(email);
    if (!user || !user.passwordHash) throw new Error("Invalid credentials");
    const ok = await this.hasher.compare(input.password, user.passwordHash);
    if (!ok) throw new Error("Invalid credentials");
    const token = await this.tokens.generate({ id: user.id, email: user.email });
    return { token, user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt.toISOString() } };
  }
}
