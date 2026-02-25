import { PrismaPg } from '@prisma/adapter-pg'

import { DbClient } from './db-adapter.helper'

export const buildDbClient = (env?: string): DbClient => {
  const datasourceUrl = env || process.env.DATABASE__URL || process.env.DATABASE_URL

  if (!datasourceUrl) {
    throw new Error('DATABASE__URL (or DATABASE_URL) is required to initialize Prisma client')
  }

  const adapter = new PrismaPg({ connectionString: datasourceUrl })
  return new DbClient({ adapter })
}
