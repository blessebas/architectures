import { Request, Response } from "express";
import { Login } from "../../../application/services/Login";
import { RegisterUser } from "../../../../users/application/services/RegisterUser";

export class AuthController {
  constructor(private loginUC: Login, private registerUC: RegisterUser) {}
  async login(req: Request, res: Response) {
    try {
      const result = await this.loginUC.execute(req.body);
      return res.json(result);
    } catch (e: any) {
      return res.status(401).json({ message: e.message });
    }
  }
  async register(req: Request, res: Response) {
    try {
      const user = await this.registerUC.execute(req.body);
      return res.status(201).json(user);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }
}
