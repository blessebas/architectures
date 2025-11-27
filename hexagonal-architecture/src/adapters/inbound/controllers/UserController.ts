import { Request, Response } from "express";
import { RegisterUser } from "../../../application/use-cases/register-user";
import { ListUsers } from "../../../application/use-cases/list-users";
import { GetUser } from "../../../application/use-cases/get-user";
import { DeleteUser } from "../../../application/use-cases/delete-user";

export class UserController {
  constructor(
    private registerUser: RegisterUser,
    private listUsersUC: ListUsers,
    private getUserUC: GetUser,
    private deleteUserUC: DeleteUser
  ) {}

  async create(req: Request, res: Response) {
    try {
      const user = await this.registerUser.execute(req.body);
      return res.status(201).json(user);
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }

  async list(_req: Request, res: Response) {
    const users = await this.listUsersUC.execute();
    return res.json(users);
  }

  async get(req: Request, res: Response) {
    const user = await this.getUserUC.execute(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    try {
      await this.deleteUserUC.execute(req.params.id);
      return res.status(204).send();
    } catch (e: any) {
      return res.status(404).json({ message: e.message });
    }
  }
}
