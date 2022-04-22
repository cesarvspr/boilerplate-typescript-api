import {singleton} from 'tsyringe'
import pino, {Logger} from 'pino'
import context from './async-context'

export interface ILoggerService {
  info(msg: string, ...args: any[]): void
  error(msg: string, ...args: any[]): void
  warn(msg: string, ...args: any[]): void
}

export class LoggerService implements ILoggerService {
  private logger: Logger

  constructor(private label: string) {
    this.logger = pino()
  }

  info(msg: string, ...args: any[]): void {
    const requestId = (context.getStore() as any)?.get('requestId')

    this.logger.info({
      message: msg,
      severity: 'INFO',
      labels: {
        requestId
      },
      'logging.googleapis.com/sourceLocation': {
        file: this.label
      },
      'logging.googleapis.com/spanId': requestId
    })
  }

  error(msg: string, ...args: any[]): void {
    const requestId = (context.getStore() as any)?.get('requestId')

    this.logger.error({
      message: msg,
      severity: 'ERROR',
      labels: {
        requestId
      },
      'logging.googleapis.com/sourceLocation': {
        file: this.label
      },
      'logging.googleapis.com/spanId': requestId
    })
  }

  warn(msg: string, ...args: any[]): void {
    const requestId = (context.getStore() as any)?.get('requestId')

    this.logger.warn({
      message: msg,
      severity: 'WARN',
      labels: {
        requestId
      },
      'logging.googleapis.com/sourceLocation': {
        file: this.label
      },
      'logging.googleapis.com/spanId': requestId
    })
  }
}

export interface ILoggerFactory {
  build(context: string): ILoggerService
}

@singleton<ILoggerFactory>()
export class LoggerFactory implements ILoggerFactory {
  build(label: string): ILoggerService {
    return new LoggerService(label)
  }
}
