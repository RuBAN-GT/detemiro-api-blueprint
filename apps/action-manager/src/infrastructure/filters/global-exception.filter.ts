import { FastifyReply } from 'fastify'

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, LoggerService } from '@nestjs/common'

import { HttpErrorResponse } from './defs'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(protected readonly logger: LoggerService) {}

  public catch(exception: HttpException, host: ArgumentsHost): void {
    const fastifyReply = host.switchToHttp().getResponse<FastifyReply>()
    const statusCode = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const payload = exception.getResponse ? exception.getResponse() : undefined

    const response = Object.assign(new HttpErrorResponse(), { message: exception.message, payload, statusCode })
    this.logger.error('Catch the error: %o', response)
    if (fastifyReply.status) {
      fastifyReply.status(statusCode).send(response)
    }
  }
}
