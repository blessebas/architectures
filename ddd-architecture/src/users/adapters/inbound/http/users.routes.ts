import { Router } from "express";
import { validate } from "../../../../shared/middlewares/validate.middleware";
import { registerSchema } from "../../../../shared/validators/auth.validator";
import { UserController } from "../controllers/UserController";
import { PrismaUserRepository } from "../../outbound/prisma-user.repository";
import { BcryptPasswordHasher } from "../../../../auth/adapters/outbound/bcrypt.hasher";
import { RegisterUser } from "../../../application/services/RegisterUser";

export const makeUserRoutes = () => {
  const router = Router();
  const repo = new PrismaUserRepository();
  const hasher = new BcryptPasswordHasher(10);
  const controller = new UserController(new RegisterUser(repo, hasher), repo);
  router.post("/users", validate({ body: registerSchema }), (req, res) => controller.create(req, res));
  router.get("/users", (req, res) => controller.list(req, res));
  router.get("/users/:id", (req, res) => controller.get(req, res));
  router.delete("/users/:id", (req, res) => controller.delete(req, res));
  return router;
};
