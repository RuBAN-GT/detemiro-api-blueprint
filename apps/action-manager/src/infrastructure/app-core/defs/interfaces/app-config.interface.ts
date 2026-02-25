import { AppRedisConfig } from './app-config-redis.interface'

export interface AppConfig {
  port: number
  databaseUrl: string
  redis: AppRedisConfig
}
