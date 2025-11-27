export class TaskEntity {
  constructor(
    public id: string,
    public title: string,
    public description?: string,
    public done: boolean = false,
    public ownerId?: string,
    public createdAt?: Date
  ) {
    if (!title || title.length < 1) throw new Error("Invalid title");
  }
}
