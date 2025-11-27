import { Request, Response, NextFunction } from "express";
import { JwtTokenService } from "../../infrastructure/adapters/JwtTokenService";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers["authorization"];
    if (!header || typeof header !== "string" || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = header.slice(7);
    const secret = process.env.JWT_SECRET ?? "changeme";
    const service = new JwtTokenService(secret, process.env.JWT_EXPIRES_IN ?? "1h");
    const payload = await service.verify(token);
    (req as any).user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
