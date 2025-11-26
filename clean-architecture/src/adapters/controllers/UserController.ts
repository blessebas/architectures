import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/useCases/users/CreateUserUseCase";
import { ListUsersUseCase } from "../../application/useCases/users/ListUsersUseCase";
import { GetUserUseCase } from "../../application/useCases/users/GetUserUseCase";
import { DeleteUserUseCase } from "../../application/useCases/users/DeleteUserUseCase";

export class UserController {
  constructor(
    private createUserUC: CreateUserUseCase,
    private listUsersUC: ListUsersUseCase,
    private getUserUC: GetUserUseCase,
    private deleteUserUC: DeleteUserUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const out = await this.createUserUC.execute({ name: req.body.name, email: req.body.email, password: req.body.password });
      return res.status(201).json(out);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async list(req: Request, res: Response) {
    const out = await this.listUsersUC.execute();
    return res.json(out);
  }

  async get(req: Request, res: Response) {
    try {
      const out = await this.getUserUC.execute(req.params.id);
      return res.json(out);
    } catch (err: any) {
      return res.status(404).json({ message: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.deleteUserUC.execute(req.params.id);
      return res.status(204).send();
    } catch (err: any) {
      return res.status(404).json({ message: err.message });
    }
  }
}