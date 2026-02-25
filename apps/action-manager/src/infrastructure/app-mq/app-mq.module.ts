import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProvider, ClientsModule } from '@nestjs/microservices'

import { appMqConfigurator } from './utils'

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: 'RMQ_CLIENT',
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService): ClientProvider => appMqConfigurator(configService),
        },
      ],
    }),
  ],
})
export class AppMqModule {}
