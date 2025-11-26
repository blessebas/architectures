export abstract class BaseCreateUseCase<Input, Output> {
    abstract execute(input: Input): Promise<Output>;
}