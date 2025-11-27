import { Request, Response } from "express";
import { CreateUser } from "../../../application/use-cases/CreateUser";
import { ListUsers } from "../../../application/use-cases/ListUsers";
import { GetUser } from "../../../application/use-cases/GetUser";
import { DeleteUser } from "../../../application/use-cases/DeleteUser";

export class UserController {
  constructor(private createUC: CreateUser, private listUC: ListUsers, private getUC: GetUser, private deleteUC: DeleteUser) {}
  async create(req: Request, res: Response) {
    try {
      const user = await this.createUC.execute(req.body);
      return res.status(201).json(user);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }
  async list(_req: Request, res: Response) {
    const users = await this.listUC.execute();
    return res.json(users);
  }
  async get(req: Request, res: Response) {
    try {
      const user = await this.getUC.execute(req.params.id);
      return res.json(user);
    } catch (e: any) {
      return res.status(404).json({ message: e.message });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      await this.deleteUC.execute(req.params.id);
      return res.status(204).send();
    } catch (e: any) {
      return res.status(404).json({ message: e.message });
    }
  }
}
