import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { TokenService } from "../../domain/ports/TokenService";

export class JwtTokenServiceImpl implements TokenService {
  constructor(private secret: Secret, private expiresIn: string | number = "1h") {}
  async generate(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn } as SignOptions);
  }
  async verify<T = any>(token: string): Promise<T> {
    return jwt.verify(token, this.secret) as T;
  }
}
