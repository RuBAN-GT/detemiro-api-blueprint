import { NestLoggerModule } from 'detemiro-logger-nestjs'

import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { AppConfigModule } from '../app-config'

@Module({
  imports: [
    CqrsModule.forRoot(),
    NestLoggerModule.forRoot({
      application: process.env.APP__NAME ?? 'detemiro-api-action-manager',
    }),
    AppConfigModule,
  ],
})
export class AppCoreModule {}
