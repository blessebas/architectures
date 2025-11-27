import { Router } from "express";
import { validate } from "../../../../shared/middlewares/validate.middleware";
import { registerSchema } from "../../../../shared/validators/auth.validator";
import { UserController } from "../controllers/UserController";
import { PrismaUserRepository } from "../../outbound/prisma-user.repository";
import { BcryptPasswordHasher } from "../../../../auth/adapters/outbound/bcrypt.hasher";
import { CreateUser } from "../../../application/use-cases/CreateUser";
import { ListUsers } from "../../../application/use-cases/ListUsers";
import { GetUser } from "../../../application/use-cases/GetUser";
import { DeleteUser } from "../../../application/use-cases/DeleteUser";

export const makeUserRoutes = () => {
  const router = Router();
  const repo = new PrismaUserRepository();
  const hasher = new BcryptPasswordHasher(10);
  const controller = new UserController(new CreateUser(repo, hasher), new ListUsers(repo), new GetUser(repo), new DeleteUser(repo));
  router.post("/api/users", validate({ body: registerSchema }), (req, res) => controller.create(req, res));
  router.get("/api/users", (req, res) => controller.list(req, res));
  router.get("/api/users/:id", (req, res) => controller.get(req, res));
  router.delete("/api/users/:id", (req, res) => controller.delete(req, res));
  return router;
};
