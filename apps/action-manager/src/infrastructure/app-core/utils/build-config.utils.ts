import { AppConfig } from '../defs'

export const buildConfigOptions = (): AppConfig => ({
  port: +(process.env.APP__PORT || process.env.PORT || 3000),
  databaseUrl: process.env.DATABASE__URL,
  redis: {
    host: process.env.REDIS__HOST || 'localhost',
    port: +(process.env.REDIS__PORT || 6379),
  },
})
