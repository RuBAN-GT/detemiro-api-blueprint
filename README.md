# Detemiro API Blueprint

`detemiro-api-blueprint` is a starter monorepo for backend API services.

## Structure

- [apps/action-manager](./apps/action-manager) - main business-logic service.
- [libs/db-adapter](./libs/db-adapter) - database access and migrations layer.

## Runtime Modes

- API process: HTTP server (`api.ts` / `ApiModule`).
- Worker process: RabbitMQ consumer (`worker.ts` / `WorkerModule`).

## Quick Start

```bash
yarn install
yarn build
yarn workspace detemiro-api-action-manager api:prod
```

## Docker Compose

`docker-compose.yml` starts:

- `action-manager-api`
- `action-manager-worker`
- `rabbitmq`
- `postgres`
- `redis`

## Development

- `yarn lint` - run lints in all workspaces.
- `yarn build` - build all workspaces in topological order.

## Contributing

I welcome contributions! Follow these steps to contribute:

1. Setup environment
   1. Fork the repository.
   2. Clone your forked repository.
   3. Install dependencies by running `yarn install`.
2. Making Changes
   1. Create a new branch for your changes.
   2. Make your changes and commit them.
   3. Push your changes to your forked repository.
3. Submitting a Pull Request
   1. Go to the original repository on GitHub and click the "New pull request" button.
   2. Select your branch and submit the pull request.
   3. Wait for the review and address any feedback.

You are the star of this project! 🌟
