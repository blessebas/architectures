import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { JwtTokenService } from "../infrastructure/adapters/JwtTokenService";

export class AuthService {
  constructor(private repo: UserRepository = new UserRepository()) {}

  async register(input: { name: string; email: string; password: string }) {
    const existing = await this.repo.findByEmail(input.email);
    if (existing) throw new Error("Email already in use");
    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.repo.create({ name: input.name, email: input.email, passwordHash });
    return { id: user.id, name: user.name, email: user.email, createdAt: (user.createdAt ?? new Date()).toISOString() };
  }

  async login(input: { email: string; password: string }) {
    const user = await this.repo.findByEmail(input.email);
    if (!user || !user.passwordHash) throw new Error("Invalid credentials");
    const ok = await bcrypt.compare(input.password, user.passwordHash);
    if (!ok) throw new Error("Invalid credentials");
    const secret = process.env.JWT_SECRET ?? "changeme";
    const service = new JwtTokenService(secret, process.env.JWT_EXPIRES_IN ?? "1h");
    const token = await service.generate({ id: user.id, email: user.email });
    return { token, user: { id: user.id, name: user.name, email: user.email, createdAt: (user.createdAt ?? new Date()).toISOString() } };
  }
}
