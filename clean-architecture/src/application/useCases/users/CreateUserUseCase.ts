import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";
import { v4 as uuidv4 } from "uuid";
import { DomainError } from "../../../domain/errors/DomainError";
import bcrypt from "bcrypt";
import { CreateUserDTO } from "../../../adapters/validators/auth.validator"; // tipo inferido

export class CreateUserUseCase {
  constructor(private userRepo: IUserRepository) { }

  async execute(input: CreateUserDTO) {
    const existing = await this.userRepo.findByEmail(input.email.toLowerCase());
    if (existing) throw new DomainError('Email already in use');

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = new User({ id: uuidv4(), name: input.name, email: input.email, passwordHash, createdAt: new Date() });
    await this.userRepo.save(user);
    return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt.toISOString() };
  }
}