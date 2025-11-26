export class Task {
    public readonly id: string;
    public title: string;
    public description?: string;
    public done: boolean;
    public ownerId?: string // optional link to User id
    public createdAt: Date;

    constructor(props: { id: string; title: string; description?: string; done?: boolean; ownerId?: string; createdAt?: Date }) {
        if (!props.title || props.title.trim().length === 0) throw new Error('Title is required');
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
        this.done = props.done ?? false;
        this.ownerId = props.ownerId;
        this.createdAt = props.createdAt ?? new Date();
    }
}