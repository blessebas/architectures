import { Request, Response } from "express";
import { CreateTask } from "../../../application/use-cases/create-task";
import { UpdateTask } from "../../../application/use-cases/update-task";
import { DeleteTask } from "../../../application/use-cases/delete-task";
import { ListTasks } from "../../../application/use-cases/list-tasks";

export class TaskController {
  constructor(
    private createTask: CreateTask,
    private updateTask: UpdateTask,
    private deleteTask: DeleteTask,
    private listTasks: ListTasks
  ) {}

  async create(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user || !user.id) return res.status(401).json({ message: "Unauthorized" });
    const task = await this.createTask.execute({ title: req.body.title, description: req.body.description, ownerId: user.id });
    return res.status(201).json(task);
  }

  async update(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user || !user.id) return res.status(401).json({ message: "Unauthorized" });
    const task = await this.updateTask.execute(req.params.id, req.body);
    return res.json(task);
  }

  async delete(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user || !user.id) return res.status(401).json({ message: "Unauthorized" });
    await this.deleteTask.execute(req.params.id);
    return res.status(204).send();
  }

  async list(req: Request, res: Response) {
    const ownerId = typeof req.query.ownerId === "string" ? req.query.ownerId : undefined;
    const tasks = await this.listTasks.execute(ownerId);
    return res.json(tasks);
  }
}
