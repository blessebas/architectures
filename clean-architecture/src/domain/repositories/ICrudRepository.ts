export interface ICrudRepository<T, ID = string> {
    findById(id: ID): Promise<T | null>;
    list(): Promise<T[]>;
    save(entity: T): Promise<void>;
    delete(id: ID): Promise<void>;
}