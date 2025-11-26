export class InMemoryCrudRepository<T extends { id: string }> {
    protected items: Map<string, T> = new Map();

    async findById(id: string): Promise<T | null> {
        return this.items.get(id) ?? null;
    }

    async list(): Promise<T[]> {
        return Array.from(this.items.values());
    }

    async save(entity: T): Promise<void> {
        this.items.set(entity.id, entity);
    }

    async delete(id: string): Promise<void> {
        this.items.delete(id);
    }
}