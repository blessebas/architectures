import { Request, Response } from "express";
import { AuthService } from "../../services/auth.service";
import { registerSchema, loginSchema } from "../../validators/auth.validator";

export class AuthController {
  constructor(private service: AuthService = new AuthService()) {}

  async register(req: Request, res: Response) {
    registerSchema.parse(req.body);
    try {
      const user = await this.service.register(req.body);
      return res.status(201).json(user);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }

  async login(req: Request, res: Response) {
    loginSchema.parse(req.body);
    try {
      const result = await this.service.login(req.body);
      return res.json(result);
    } catch (e: any) {
      return res.status(401).json({ message: e.message });
    }
  }
}
