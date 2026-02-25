# DB Manager

Database layer for application data access and migrations.

## Setup

1. Prepare `.env` from `.env.example` if you plan to run migrations.
2. Install dependencies: `yarn install`.
3. Generate Prisma client: `yarn build:prisma`.

## Run Migrations

```bash
yarn release
```

## Create Migrations

```bash
yarn prisma generate
```

## Usage

DB Adapter provides Prisma ORM through the `DbClient` class.
Use `buildDbClient` to create a configured instance:

```typescript
const dbClient = buildDbClient(configService.get('databaseUrl'))

logger.debug('Connect dbClient to DB.')
await dbClient.$connect()
logger.debug('dbClient successfully connected.')
```

## References

Find more details in the official Prisma guide: [Prisma Client](https://www.prisma.io/client).
