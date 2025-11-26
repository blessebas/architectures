export abstract class BaseListUseCase<Output> {
  abstract execute(): Promise<Output[]>;
}