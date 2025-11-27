export class TaskTitle {
  private readonly value: string;
  constructor(value: string) {
    if (!value || value.trim().length === 0) throw new Error("Title is required");
    this.value = value.trim();
  }
  toString() {
    return this.value;
  }
}
