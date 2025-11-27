import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel";

export class UserController {
  constructor(private model: UserModel) {}

  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const existing = await this.model.findByEmail(email);
      if (existing) return res.status(400).json({ message: "Email already in use" });
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await this.model.create({ name, email, passwordHash });
      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async list(_req: Request, res: Response) {
    const users = await this.model.list();
    return res.json(users);
  }

  async get(req: Request, res: Response) {
    const user = await this.model.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    const user = await this.model.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await this.model.delete(req.params.id);
    return res.status(204).send();
  }
}
