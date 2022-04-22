import {Result} from 'src/core/result'

export interface IUseCase<D, R> {
  exec(data: D): Promise<Result<R>>
}
