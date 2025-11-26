import jwt, { SignOptions } from "jsonwebtoken";
import { ITokenService } from "../../application/ports/ITokenService";

export class JwtTokenService implements ITokenService {
    constructor(private secret: string, private expiresIn: string | number = "1h") { }

    async generate(payload: Record<string, unknown>): Promise<string> {
        return new Promise((resolve, reject) => {
            const options: SignOptions = { expiresIn: this.expiresIn as any };
            jwt.sign(payload, this.secret, options, (err, token) => {
                if (err || !token) return reject(err ?? new Error("Token generation failed"));
                resolve(token);
            });
        });
    }

    async verify<T = any>(token: string): Promise<T> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secret, (err, decoded) => {
                if (err) return reject(err);
                resolve(decoded as T);
            });
        });
    }
}
