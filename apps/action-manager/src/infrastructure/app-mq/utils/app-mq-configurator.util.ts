import { ConfigService } from '@nestjs/config'
import { RmqOptions, Transport } from '@nestjs/microservices'

export const appMqConfigurator = (configService: ConfigService): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [configService.getOrThrow<string>('rabbit.url', 'amqp://rabbitmq:rabbitmq@localhost:5672')],
    queue: configService.getOrThrow<string>('rabbit.queue', 'detemiro-api-listener'),
    queueOptions: {
      durable: true,
    },
  },
})
