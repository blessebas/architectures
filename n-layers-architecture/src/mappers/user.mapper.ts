import { UserEntity } from "../domain/user.entity";
import { UserResponseDTO } from "../dtos/user.dto";

export const toUserResponseDTO = (u: UserEntity): UserResponseDTO => ({
  id: u.id,
  name: u.name,
  email: u.email,
  createdAt: (u.createdAt ?? new Date()).toISOString(),
});
