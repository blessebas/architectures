import { UserRepository } from "../../domain/ports/user.repository";
import { UserResponseDTO } from "../dtos/user.dto";
import { toUserResponseDTO } from "../mappers/user.mapper";

export class ListUsers {
  constructor(private repo: UserRepository) {}
  async execute(): Promise<UserResponseDTO[]> {
    const users = await this.repo.list();
    return users.map(toUserResponseDTO);
  }
}
