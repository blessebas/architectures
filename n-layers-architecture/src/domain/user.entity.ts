export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public passwordHash?: string,
    public createdAt?: Date
  ) {
    if (!name || name.length < 2) throw new Error("Invalid name");
    if (!email || !email.includes("@")) throw new Error("Invalid email");
  }
}
