import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IPasswordHasher } from "../../ports/IPasswordHasher";
import { ITokenService } from "../../ports/ITokenService";
import { DomainError } from "../../../domain/errors/DomainError";

export class LoginUseCase {
    constructor(
        private userRepo: IUserRepository,
        private hasher: IPasswordHasher,
        private tokenService: ITokenService
    ) { }

    async execute(email: string, password: string) {
        const user = await this.userRepo.findByEmail(email.toLowerCase());
        if (!user) throw new DomainError("Invalid credentials");

        const ok = await this.hasher.compare(password, user.passwordHash ?? "");
        if (!ok) throw new DomainError("Invalid credentials");

        const payload = { sub: user.id, email: user.email };
        const token = await this.tokenService.generate(payload);

        return { token, user: user.toPublic() };
    }
}