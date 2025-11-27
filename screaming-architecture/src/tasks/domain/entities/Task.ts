export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public description?: string,
    public done: boolean = false,
    public ownerId?: string,
    public createdAt: Date = new Date()
  ) {
    if (!title || title.trim().length === 0) throw new Error("Title is required");
  }
}
