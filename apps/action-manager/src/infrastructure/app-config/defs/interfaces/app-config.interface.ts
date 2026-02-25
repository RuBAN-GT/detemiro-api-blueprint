import { AppRabbitConfig } from './app-config-rabbit.interface'
import { AppRedisConfig } from './app-config-redis.interface'

export interface AppConfig {
  port: number
  useWorker: boolean
  databaseUrl: string
  redis: AppRedisConfig
  rabbit: AppRabbitConfig
}
