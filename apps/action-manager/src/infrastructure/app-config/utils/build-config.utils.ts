import { AppConfig } from '../defs'

export const buildConfigOptions = (): AppConfig => ({
  port: +(process.env.APP__PORT || process.env.PORT || 3000),
  useWorker: (process.env.APP__USE_WORKER || 'true') === 'true',
  databaseUrl: process.env.DATABASE__URL,
  rabbit: {
    url: process.env.RABBIT__URL || 'amqp://rabbitmq:rabbitmq@localhost:5672',
    queue: process.env.RABBIT__QUEUE || 'detemiro-api-listener',
  },
  redis: {
    host: process.env.REDIS__HOST || 'localhost',
    port: +(process.env.REDIS__PORT || 6379),
  },
})
