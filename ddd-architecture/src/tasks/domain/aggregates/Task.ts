import { TaskTitle } from "../value-objects/TaskTitle";

export class Task {
  constructor(
    public readonly id: string,
    private _title: TaskTitle,
    private _description?: string,
    private _done: boolean = false,
    public readonly ownerId?: string,
    public readonly createdAt: Date = new Date()
  ) {}
  get title() {
    return this._title.toString();
  }
  get description() {
    return this._description;
  }
  get done() {
    return this._done;
  }
  rename(title: TaskTitle) {
    this._title = title;
  }
  changeDescription(description?: string) {
    this._description = description;
  }
  complete() {
    this._done = true;
  }
  reopen() {
    this._done = false;
  }
}
