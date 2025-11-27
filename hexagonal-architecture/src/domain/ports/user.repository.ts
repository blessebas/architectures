import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
  create(data: { name: string; email: string; passwordHash?: string }): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  list(): Promise<UserEntity[]>;
  delete(id: string): Promise<void>;
}
