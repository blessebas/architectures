import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel";
import { JwtTokenService } from "../infrastructure/adapters/JwtTokenService";

export class AuthController {
  constructor(private users: UserModel) {}

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const existing = await this.users.findByEmail(email);
    if (existing) return res.status(400).json({ message: "Email already in use" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.users.create({ name, email, passwordHash });
    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.users.findByEmail(email);
    if (!user || !user.passwordHash) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const secret = process.env.JWT_SECRET ?? "changeme";
    const service = new JwtTokenService(secret, process.env.JWT_EXPIRES_IN ?? "1h");
    const token = await service.generate({ id: user.id, email: user.email });
    return res.json({ token, user });
  }
}
