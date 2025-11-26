import { Request, Response } from "express";
import { CreateTaskUseCase } from "../../application/useCases/tasks/CreateTaskUseCase";
import { UpdateTaskUseCase } from "../../application/useCases/tasks/UpdateTaskUseCase";
import { DeleteTaskUseCase } from "../../application/useCases/tasks/DeleteTaskUseCase";
import { ListTasksUseCase } from "../../application/useCases/tasks/ListTasksUseCase";
import { ListTasksQuery } from "../validators/task.validator";

export class TaskController {
    constructor(
        private createTaskUC: CreateTaskUseCase,
        private updateTaskUC: UpdateTaskUseCase,
        private deleteTaskUC: DeleteTaskUseCase,
        private listTasksUC: ListTasksUseCase
    ) { }

    async create(req: Request, res: Response) {
        try {
            const out = await this.createTaskUC.execute({ title: req.body.title, description: req.body.description, ownerId: req.body.ownerId });
            return res.status(201).json(out);
        } catch (err: any) {
            return res.status(400).json({ message: err.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const out = await this.updateTaskUC.execute(req.params.id, { title: req.body.title, description: req.body.description, done: req.body.done });
            return res.json(out);
        } catch (err: any) {
            return res.status(404).json({ message: err.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await this.deleteTaskUC.execute(req.params.id);
            return res.status(204).send();
        } catch (err: any) {
            return res.status(404).json({ message: err.message });
        }
    }

    async list(req: Request, res: Response) {
        const query = req.query as ListTasksQuery;
        const out = await this.listTasksUC.execute(query.ownerId);
        return res.json(out);
    }
}