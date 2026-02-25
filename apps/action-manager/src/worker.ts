import { NestLoggerService } from 'detemiro-logger-nestjs'

import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions } from '@nestjs/microservices'

import { appMqConfigurator } from './infrastructure/app-mq'
import { GlobalExceptionFilter } from './infrastructure/filters'
import { WorkerModule } from './worker.module'

async function bootstrap(): Promise<void> {
  const appContext = await NestFactory.createApplicationContext(WorkerModule)
  const configService = appContext.get(ConfigService)

  const workerApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    WorkerModule,
    appMqConfigurator(configService),
  )

  const generalLogger = workerApp.get(NestLoggerService)
  workerApp.useLogger(generalLogger)
  workerApp.useGlobalFilters(new GlobalExceptionFilter(generalLogger))

  await workerApp.listen()
}

void bootstrap()
