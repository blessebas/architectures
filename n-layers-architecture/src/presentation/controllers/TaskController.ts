import { Request, Response } from "express";
import { TaskService } from "../../services/task.service";
import { createTaskSchema, updateTaskSchema, listTasksQuerySchema } from "../../validators/task.validator";
import { idParamSchema } from "../../validators/user.validator";

export class TaskController {
  constructor(private service: TaskService = new TaskService()) {}

  async create(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user || !user.id) return res.status(401).json({ message: "Unauthorized" });
    createTaskSchema.parse(req.body);
    const task = await this.service.create({ title: req.body.title, description: req.body.description, ownerId: user.id });
    return res.status(201).json(task);
  }

  async update(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user || !user.id) return res.status(401).json({ message: "Unauthorized" });
    idParamSchema.parse(req.params);
    updateTaskSchema.parse(req.body);
    const existing = await this.service.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Task not found" });
    if (existing.ownerId && existing.ownerId !== user.id) return res.status(403).json({ message: "Forbidden" });
    const task = await this.service.update(req.params.id, req.body);
    return res.json(task);
  }

  async delete(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user || !user.id) return res.status(401).json({ message: "Unauthorized" });
    idParamSchema.parse(req.params);
    const existing = await this.service.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Task not found" });
    if (existing.ownerId && existing.ownerId !== user.id) return res.status(403).json({ message: "Forbidden" });
    await this.service.delete(req.params.id);
    return res.status(204).send();
  }

  async list(req: Request, res: Response) {
    listTasksQuerySchema.parse(req.query as any);
    const ownerId = typeof req.query.ownerId === "string" ? req.query.ownerId : undefined;
    const tasks = await this.service.list(ownerId);
    return res.json(tasks);
  }
}
