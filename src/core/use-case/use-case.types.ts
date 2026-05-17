export interface IUseCase<Input, Output> {
  execute(data: Input): Promise<Output>;
}
