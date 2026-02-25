# Action Manager

## Overview

`action-manager` is the main backend service process in this workspace.
It is split into two runtime modes:

- `api` - HTTP entrypoint for external/internal requests.
- `worker` - RabbitMQ consumer for background command processing.

Core responsibilities:

- expose health endpoints;
- initialize infrastructure modules (config, logger, DB, cache, MQ);
- route commands through `cqrs-proxy` between API and worker flows;
- execute business handlers with shared `DbClient`.

## Installation and Run

1. `yarn install`
2. Prepare `.env` using `.env.example`
3. Start one of the modes:
   - API dev: `yarn api:dev`
   - Worker dev: `yarn worker:dev`
   - API prod: `yarn api:prod`
   - Worker prod: `yarn worker:prod`

## Endpoints

- `[GET] /healthz` - liveness probe.
- `[GET] /readyz` - readiness probe.

## Runtime Logic

1. API process boots `ApiModule`, HTTP server, and global exception/logging setup.
2. Worker process boots `WorkerModule` and subscribes to RabbitMQ queue.
3. `CqrsProxyClientModule` uses `RMQ_CLIENT` to forward commands when worker mode is enabled.
4. `CqrsProxyWorkerModule` handles queued commands in worker runtime.
5. `AppDbModule` creates `DbClient` via `buildDbClient()` and connects to PostgreSQL.
6. Shared infrastructure (`app-core`, `app-config`, `app-mq`, `app-cache`) is loaded once per process.

## Configuration

All required runtime configuration is provided via `.env` (see `.env.example`).

### Common

- `APP__PORT` - API port.
- `DATABASE__URL` - database connection URL.
- `REDIS__HOST` - Redis host.
- `REDIS__PORT` - Redis port.
- `RABBIT__URL` - RabbitMQ connection URL.
- `RABBIT__QUEUE` - RabbitMQ queue name.
- `APP__USE_WORKER` - enable worker mode for CQRS proxy integration.
