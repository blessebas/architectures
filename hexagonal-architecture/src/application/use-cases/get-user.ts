import { UserRepository } from "../../domain/ports/user.repository";
import { UserResponseDTO } from "../dtos/user.dto";
import { toUserResponseDTO } from "../mappers/user.mapper";

export class GetUser {
  constructor(private repo: UserRepository) {}
  async execute(id: string): Promise<UserResponseDTO | null> {
    const user = await this.repo.findById(id);
    return user ? toUserResponseDTO(user) : null;
  }
}
