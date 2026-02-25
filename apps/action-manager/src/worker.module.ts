import { CqrsProxyClientModule, CqrsProxyWorkerModule } from 'cqrs-proxy'

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AppModule } from './app.module'

@Module({
  imports: [
    AppModule,
    CqrsProxyClientModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        clientToken: 'RMQ_CLIENT',
        useSyncMode: !config.get('useWorker', true),
      }),
    }),
    CqrsProxyWorkerModule.forRoot(),
  ],
})
export class WorkerModule {}
