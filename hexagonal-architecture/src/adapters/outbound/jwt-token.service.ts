import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { TokenService } from "../../domain/ports/token.service";

export class JwtTokenServiceImpl implements TokenService {
  constructor(private secret: Secret, private expiresIn: string = "1h") {}
  async generate(payload: any): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn } as SignOptions);
  }
  async verify(token: string): Promise<any> {
    return jwt.verify(token, this.secret);
  }
}
