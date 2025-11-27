import { Request, Response } from "express";
import { CreateTask } from "../../../application/services/CreateTask";
import { UpdateTask } from "../../../application/services/UpdateTask";
import { DeleteTask } from "../../../application/services/DeleteTask";
import { ListTasks } from "../../../application/services/ListTasks";

export class TaskController {
  constructor(private createUC: CreateTask, private updateUC: UpdateTask, private deleteUC: DeleteTask, private listUC: ListTasks) {}
  async create(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user || !user.id) return res.status(401).json({ message: "Unauthorized" });
    const task = await this.createUC.execute({ title: req.body.title, description: req.body.description, ownerId: user.id });
    return res.status(201).json(task);
  }
  async update(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user || !user.id) return res.status(401).json({ message: "Unauthorized" });
    const task = await this.updateUC.execute(req.params.id, req.body);
    return res.json(task);
  }
  async delete(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user || !user.id) return res.status(401).json({ message: "Unauthorized" });
    await this.deleteUC.execute(req.params.id);
    return res.status(204).send();
  }
  async list(req: Request, res: Response) {
    const ownerId = typeof req.query.ownerId === "string" ? req.query.ownerId : undefined;
    const tasks = await this.listUC.execute(ownerId);
    return res.json(tasks);
  }
}
