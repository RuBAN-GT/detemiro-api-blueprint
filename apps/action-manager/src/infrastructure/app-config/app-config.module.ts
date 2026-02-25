import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { buildConfigOptions } from './utils'

@Global()
@Module({
  imports: [ConfigModule.forRoot({ load: [buildConfigOptions] })],
})
export class AppConfigModule {}
