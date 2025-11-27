import jwt, { SignOptions } from "jsonwebtoken";
import { TokenService } from "../../domain/ports/token.service";

export class JwtTokenServiceImpl implements TokenService {
  constructor(private secret: string, private expiresIn: string | number = "1h") {}
  async generate(payload: Record<string, unknown>): Promise<string> {
    return new Promise((resolve, reject) => {
      const options: SignOptions = { expiresIn: this.expiresIn as any };
      jwt.sign(payload, this.secret, options, (err, token) => {
        if (err || !token) return reject(err ?? new Error("Token generation failed"));
        resolve(token);
      });
    });
  }
  async verify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });
  }
}
