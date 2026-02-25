import { NestLoggerService } from 'detemiro-logger-nestjs'

import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

import { ApiModule } from './api.module'
import { AppConfig, GlobalExceptionFilter } from './infrastructure'

async function bootstrap(): Promise<void> {
  const api = await NestFactory.create<NestFastifyApplication>(ApiModule, new FastifyAdapter(), {
    rawBody: true,
  })

  const generalLogger = api.get(NestLoggerService)
  api.useLogger(generalLogger)
  api.useGlobalFilters(new GlobalExceptionFilter(generalLogger))

  const config = api.get(ConfigService<AppConfig>)
  const appPort = config.get<number>('port', 3000)
  await api.listen(appPort, '0.0.0.0')
}

void bootstrap()
