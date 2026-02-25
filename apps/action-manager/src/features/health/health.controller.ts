import { Controller, Get } from '@nestjs/common'

import { HealthData } from './defs'

@Controller()
export class HealthController {
  @Get(['/healthz', '/readyz', '/metrics'])
  public getProbes(): HealthData {
    return { message: 'OK' }
  }
}
