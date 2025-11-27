import { Email } from "../value-objects/Email";

export class User {
  constructor(
    public readonly id: string,
    private _name: string,
    private _email: Email,
    private _passwordHash?: string,
    public readonly createdAt: Date = new Date()
  ) {}
  get name() {
    return this._name;
  }
  get email() {
    return this._email.toString();
  }
  get passwordHash() {
    return this._passwordHash;
  }
  changeEmail(email: Email) {
    this._email = email;
  }
  rename(name: string) {
    if (!name || name.trim().length < 2) throw new Error("Name must be at least 2 characters");
    this._name = name.trim();
  }
  setPasswordHash(hash: string) {
    this._passwordHash = hash;
  }
}
