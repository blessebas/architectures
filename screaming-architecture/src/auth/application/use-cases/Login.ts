import { UserRepository } from "../../../users/domain/ports/UserRepository";
import { PasswordHasher } from "../../domain/ports/PasswordHasher";
import { TokenService } from "../../domain/ports/TokenService";

export class Login {
  constructor(private userRepo: UserRepository, private hasher: PasswordHasher, private tokens: TokenService) {}
  async execute(input: { email: string; password: string }) {
    const user = await this.userRepo.findByEmail(input.email);
    if (!user || !user.passwordHash) throw new Error("Invalid credentials");
    const ok = await this.hasher.compare(input.password, user.passwordHash);
    if (!ok) throw new Error("Invalid credentials");
    const token = await this.tokens.generate({ id: user.id, email: user.email });
    return { token, user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt.toISOString() } };
  }
}
