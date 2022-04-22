import {FastifyReply} from 'fastify/types/reply'
import ApiError, {ErrorCode, ErrorMap} from '../const/error'

export class Result<T> {
  public isSuccess: boolean
  public isFailure: boolean
  public error?: ErrorCode
  private readonly _value?: T

  private constructor(isSuccess: boolean, error?: ErrorCode, value?: T) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: A result cannot be
        successful and contain an error`)
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: A failing result
        needs to contain an error message`)
    }

    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    this.error = error
    this._value = value

    Object.freeze(this)
  }

  public getValue(): T | undefined {
    if (!this.isSuccess) {
      throw new Error('Cant retrieve the value from a failed result.')
    }

    return this._value
  }

  public throw(): void {
    throw this.getError()
  }

  public send(code: number, res: any): any {
    if (this.isFailure) {
      res.send(this.getError())
    } else {
      res.code(code).send(this._value)
    }
  }

  public sendFile(code: number, res: FastifyReply): any {
    if (this.isFailure) {
      res.send(this.getError())
      return
    }
    const aux = this._value as any
    res.header('Content-Disposition', `attachment; filename=${aux.filename}.pdf`)
    res.code(code).send(aux.data).type('application/pdf')
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value)
  }

  public static fail<U>(error?: ErrorCode): Result<U> {
    return new Result<U>(false, error)
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result
    }

    return Result.ok<any>()
  }

  private getError(): ApiError {
    const errorMap = ErrorMap[this.error || ErrorCode.GENERIC_ERROR]
    return new ApiError(errorMap.status, this.error as number, errorMap.message)
  }
}
