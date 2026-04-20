import type { IUseCase } from "./use-case.types";

export abstract class BaseUseCase<
  Input,
  Output,
  Repository
> implements IUseCase<Input, Output> {
  protected repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  abstract execute(data: Input): Promise<Output>;
}