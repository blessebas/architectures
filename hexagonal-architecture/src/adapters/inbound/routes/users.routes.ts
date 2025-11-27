import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../../../validators/auth.validator";
import { UserController } from "../controllers/UserController";
import { PrismaUserRepository } from "../../outbound/prisma-user.repository";
import { BcryptPasswordHasher } from "../../outbound/bcrypt.hasher";
import { RegisterUser } from "../../../application/use-cases/register-user";
import { ListUsers } from "../../../application/use-cases/list-users";
import { GetUser } from "../../../application/use-cases/get-user";
import { DeleteUser } from "../../../application/use-cases/delete-user";

export const makeUserRoutes = () => {
  const router = Router();
  const repo = new PrismaUserRepository();
  const hasher = new BcryptPasswordHasher(10);
  const controller = new UserController(new RegisterUser(repo, hasher), new ListUsers(repo), new GetUser(repo), new DeleteUser(repo));
  router.post("/users", validate({ body: registerSchema }), (req, res) => controller.create(req, res));
  router.get("/users", (req, res) => controller.list(req, res));
  router.get("/users/:id", (req, res) => controller.get(req, res));
  router.delete("/users/:id", (req, res) => controller.delete(req, res));
  return router;
};
