import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDTO, UserResponseDTO } from "../dtos/user.dto";
import { toUserResponseDTO } from "../mappers/user.mapper";

export class UserService {
  constructor(private repo: UserRepository = new UserRepository()) {}

  async register(input: CreateUserDTO): Promise<UserResponseDTO> {
    const existing = await this.repo.findByEmail(input.email);
    if (existing) throw new Error("Email already in use");
    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.repo.create({ name: input.name, email: input.email, passwordHash });
    return toUserResponseDTO(user);
  }

  async list(): Promise<UserResponseDTO[]> {
    const users = await this.repo.list();
    return users.map(toUserResponseDTO);
  }

  async get(id: string): Promise<UserResponseDTO | null> {
    const user = await this.repo.findById(id);
    return user ? toUserResponseDTO(user) : null;
  }

  async delete(id: string): Promise<void> {
    const user = await this.repo.findById(id);
    if (!user) throw new Error("User not found");
    await this.repo.delete(id);
  }
}
