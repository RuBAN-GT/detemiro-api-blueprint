import { buildDbClient, DbClient } from 'detemiro-api-db-adapter'
import { LoggerFactory } from 'detemiro-logger'
import { nestLoggerFactory } from 'detemiro-logger-nestjs'

import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export const appDbProvider: Provider = {
  provide: DbClient,
  inject: [ConfigService, nestLoggerFactory],
  useFactory: async (configService: ConfigService, loggerFactory: LoggerFactory): Promise<DbClient> => {
    const logger = loggerFactory('DbClientProvider')
    logger.log('Prepare DB environment.')

    const dbClient = buildDbClient(configService.getOrThrow('databaseUrl'))
    logger.log('Connect to DB.')
    await dbClient.$connect()
    logger.log('DB is connected.')

    return dbClient
  },
}
