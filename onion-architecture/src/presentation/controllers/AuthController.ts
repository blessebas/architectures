import { Request, Response } from "express";
import { RegisterUser } from "../../application/use-cases/register-user";
import { Login } from "../../application/use-cases/login";

export class AuthController {
  constructor(private registerUser: RegisterUser, private loginUseCase: Login) {}

  async register(req: Request, res: Response) {
    try {
      const user = await this.registerUser.execute(req.body);
      return res.status(201).json(user);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await this.loginUseCase.execute(req.body);
      return res.json(result);
    } catch (e: any) {
      return res.status(401).json({ message: e.message });
    }
  }
}
