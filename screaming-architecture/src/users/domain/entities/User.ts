export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public passwordHash?: string,
    public createdAt: Date = new Date()
  ) {
    if (!name || name.trim().length < 2) throw new Error("Name must be at least 2 characters");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Invalid email");
  }
}
