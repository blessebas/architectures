import { Request, Response } from "express";
import { TaskModel } from "../models/TaskModel";

export class TaskController {
  constructor(private model: TaskModel) {}

  async create(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user || !user.id) return res.status(401).json({ message: "Unauthorized" });
    const { title, description } = req.body;
    const task = await this.model.create({ title, description, ownerId: user.id });
    return res.status(201).json(task);
  }

  async update(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user || !user.id) return res.status(401).json({ message: "Unauthorized" });
    const id = req.params.id;
    const existing = await this.model.findById(id);
    if (!existing) return res.status(404).json({ message: "Task not found" });
    if (existing.ownerId && existing.ownerId !== user.id) return res.status(403).json({ message: "Forbidden" });
    const task = await this.model.update(id, req.body);
    return res.json(task);
  }

  async delete(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user || !user.id) return res.status(401).json({ message: "Unauthorized" });
    const id = req.params.id;
    const existing = await this.model.findById(id);
    if (!existing) return res.status(404).json({ message: "Task not found" });
    if (existing.ownerId && existing.ownerId !== user.id) return res.status(403).json({ message: "Forbidden" });
    await this.model.delete(id);
    return res.status(204).send();
  }

  async list(req: Request, res: Response) {
    const ownerId = typeof req.query.ownerId === "string" ? req.query.ownerId : undefined;
    const tasks = await this.model.list(ownerId);
    return res.json(tasks);
  }
}
