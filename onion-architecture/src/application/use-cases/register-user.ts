import { UserRepository } from "../../domain/ports/user.repository";
import { PasswordHasher } from "../../domain/ports/password.hasher";
import { CreateUserDTO, UserResponseDTO } from "../dtos/user.dto";
import { toUserResponseDTO } from "../mappers/user.mapper";

export class RegisterUser {
  constructor(private repo: UserRepository, private hasher: PasswordHasher) {}
  async execute(input: CreateUserDTO): Promise<UserResponseDTO> {
    const existing = await this.repo.findByEmail(input.email);
    if (existing) throw new Error("Email already in use");
    const passwordHash = await this.hasher.hash(input.password);
    const user = await this.repo.create({ name: input.name, email: input.email, passwordHash });
    return toUserResponseDTO(user);
  }
}
