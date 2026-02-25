import { Module } from '@nestjs/common'

import { HealthModule } from '~/features'

import { AppCoreModule, AppDbModule, AppMqModule } from './infrastructure'

@Module({
  imports: [AppCoreModule, AppDbModule, AppMqModule, HealthModule],
})
export class AppModule {}
