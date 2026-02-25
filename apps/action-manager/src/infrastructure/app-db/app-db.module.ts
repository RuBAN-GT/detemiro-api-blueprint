import { DbClient } from 'detemiro-api-db-adapter'

import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { appDbProvider } from './app-db.provider'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [appDbProvider],
  exports: [DbClient],
})
export class AppDbModule {}
