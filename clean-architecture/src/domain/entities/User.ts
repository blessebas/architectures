export class User {
    public readonly id: string;
    public name: string;
    public email: string;
    public createdAt: Date;
    public passwordHash?: string;

    constructor(props: { id: string; name: string; email: string; passwordHash?: string; createdAt: Date }) {
        if (!props.name || props.name.trim().length < 2) throw new Error('Name must be at least 2 characters');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.email)) throw new Error('Invalid email');

        this.id = props.id;
        this.name = props.name;
        this.email = props.email;
        this.passwordHash = props.passwordHash ?? undefined;
        this.createdAt = props.createdAt ?? new Date();
    }

    toPublic(): { id: string; name: string; email: string; createdAt: string } {
        return { id: this.id, name: this.name, email: this.email, createdAt: this.createdAt.toISOString() };
    }
}