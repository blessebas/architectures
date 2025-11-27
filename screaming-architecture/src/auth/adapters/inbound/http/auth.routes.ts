import { Router } from "express";
import { validate } from "../../../../shared/middlewares/validate.middleware";
import { registerSchema, loginSchema } from "../../../../shared/validators/auth.validator";
import { AuthController } from "../controllers/AuthController";
import { PrismaUserRepository } from "../../../../users/adapters/outbound/prisma-user.repository";
import { BcryptPasswordHasher } from "../../outbound/bcrypt.hasher";
import { JwtTokenServiceImpl } from "../../outbound/jwt-token.service";
import { CreateUser } from "../../../../users/application/use-cases/CreateUser";
import { Login } from "../../../aplicacion/use-cases/Login";

export const makeAuthRoutes = () => {
  const router = Router();
  const repo = new PrismaUserRepository();
  const hasher = new BcryptPasswordHasher(10);
  const tokens = new JwtTokenServiceImpl(process.env.JWT_SECRET ?? "changeme", process.env.JWT_EXPIRES_IN ?? "1h");
  const controller = new AuthController(new Login(repo, hasher, tokens), new CreateUser(repo, hasher));
  router.post("/auth/login", validate({ body: loginSchema }), (req, res) => controller.login(req, res));
  router.post("/auth/register", validate({ body: registerSchema }), (req, res) => controller.register(req, res));
  return router;
};
