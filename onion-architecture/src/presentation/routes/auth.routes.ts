import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema, loginSchema } from "../../validators/auth.validator";
import { AuthController } from "../controllers/AuthController";
import { PrismaUserRepository } from "../../infrastructure/repositories/prisma-user.repository";
import { BcryptPasswordHasher } from "../../infrastructure/adapters/bcrypt.hasher";
import { JwtTokenServiceImpl } from "../../infrastructure/adapters/jwt-token.service";
import { RegisterUser } from "../../application/use-cases/register-user";
import { Login } from "../../application/use-cases/login";

export const makeAuthRoutes = () => {
  const router = Router();
  const repo = new PrismaUserRepository();
  const hasher = new BcryptPasswordHasher(10);
  const tokens = new JwtTokenServiceImpl(process.env.JWT_SECRET ?? "changeme", process.env.JWT_EXPIRES_IN ?? "1h");
  const controller = new AuthController(new RegisterUser(repo, hasher), new Login(repo, hasher, tokens));
  router.post("/auth/register", validate({ body: registerSchema }), (req, res) => controller.register(req, res));
  router.post("/auth/login", validate({ body: loginSchema }), (req, res) => controller.login(req, res));
  return router;
};
