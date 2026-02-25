import { LoggerFactory } from 'detemiro-logger'
import { nestLoggerFactory } from 'detemiro-logger-nestjs'

import { Inject, LoggerService } from '@nestjs/common'
import { ICommand } from '@nestjs/cqrs'

export abstract class HandlerBase<T extends ICommand, R = unknown> {
  protected readonly logger: LoggerService

  constructor(@Inject(nestLoggerFactory) loggerFactory: LoggerFactory) {
    this.logger = loggerFactory(this.constructor.name)
  }

  public abstract execute(command: T): Promise<R>
}
