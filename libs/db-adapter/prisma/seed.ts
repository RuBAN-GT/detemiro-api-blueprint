import { loggerFactory } from 'detemiro-logger-node'

import { buildDbClient } from '../src'

const dbClient = buildDbClient(process.env.DATABASE__URL)
const logger = loggerFactory('migrator')

async function main(): Promise<void> {
  logger.info('Start seeding using Prisma Client %o...', dbClient)
}

main()
