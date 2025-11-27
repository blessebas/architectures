import { Request, Response } from "express";
import { UserService } from "../../services/user.service";
import { registerSchema } from "../../validators/auth.validator";
import { idParamSchema } from "../../validators/user.validator";

export class UserController {
  constructor(private service: UserService = new UserService()) {}

  async create(req: Request, res: Response) {
    registerSchema.parse(req.body);
    try {
      const user = await this.service.register(req.body);
      return res.status(201).json(user);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }

  async list(_req: Request, res: Response) {
    const users = await this.service.list();
    return res.json(users);
  }

  async get(req: Request, res: Response) {
    idParamSchema.parse(req.params);
    const user = await this.service.get(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    idParamSchema.parse(req.params);
    try {
      await this.service.delete(req.params.id);
      return res.status(204).send();
    } catch (e: any) {
      return res.status(404).json({ message: e.message });
    }
  }
}
