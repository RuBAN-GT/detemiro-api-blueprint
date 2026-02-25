import { defineConfig } from '@prisma/config'

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE__URL ?? 'postgresql://postgres:postgres@localhost:5432/postgres',
  },
})
