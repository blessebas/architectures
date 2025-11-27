import { Request, Response } from "express";
import { RegisterUser } from "../../../application/services/RegisterUser";
import { UserRepository } from "../../../domain/ports/UserRepository";

export class UserController {
  constructor(private register: RegisterUser, private repo: UserRepository) {}
  async create(req: Request, res: Response) {
    try {
      const user = await this.register.execute(req.body);
      return res.status(201).json(user);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }
  async list(_req: Request, res: Response) {
    const users = await this.repo.list();
    return res.json(users.map((u) => ({ id: u.id, name: u.name, email: u.email, createdAt: u.createdAt.toISOString() })));
  }
  async get(req: Request, res: Response) {
    const user = await this.repo.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt.toISOString() });
  }
  async delete(req: Request, res: Response) {
    const user = await this.repo.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await this.repo.delete(req.params.id);
    return res.status(204).send();
  }
}
