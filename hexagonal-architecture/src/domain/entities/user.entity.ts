export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public passwordHash?: string,
    public createdAt?: Date
  ) {}
}
