# Backend Code Style Guide

This guide describes a practical backend architecture for Nest.js and, more generally, TypeScript/Node.js services.

The approach mixes modular design, CQRS, and hexagonal ideas while keeping the structure simple for teams.

## High-Level Structure

### `features`

Business features organized as black boxes.

- Each feature should expose a clear public API via `index.ts`.
- Typical exported entities:
  - `[feature].module.ts`
  - CQRS commands for `CommandBus`
  - Public abstractions/interfaces
- A feature may contain controllers/consumers/resolvers as needed.
- Features must not directly depend on each other. Cross-feature flows belong in `application`.

### `application`

Composition modules that orchestrate multiple features.

- Follows the same structural rules as `features`.
- Used for cross-feature scenarios (for example, syncing data between two independent features).

### `infrastructure`

Application-level runtime and platform modules (for example: Redis, DB, MQ).

- Follows the same structural rules as `features`.
- Can be used by `features`, `application`, and other infrastructure modules.

### `shared`

Reusable, feature-agnostic building blocks.

- Common utilities, helper interfaces, base helpers, etc.
- Treat as one internal module with its own substructure (`defs`, `utils`, and so on).

## Common Building Blocks

### `defs` (definitions)

Types and domain definitions for the current module.

- Rule: one entity per file.
- Naming: `[entity].[type].ts` (example: `user-status.enum.ts`).
- Typical subfolders:
  - `interfaces`
  - `enums`
  - `consts`
  - `types`
  - `models` (DTOs)

### `ports`

Abstractions for external systems (APIs/services outside the application boundary).

- Naming: `[feature].port.ts` (example: `idp.port.ts`).
- For Nest DI, abstract classes are acceptable.

### `adapters`

Implementations of ports.

- Group by port and implementation.
- Naming: `[implementation].adapter.ts` (example: `keycloak-idp.adapter.ts`).

### `converters`

Mapping/transformation layer between models.

- Naming: `[model-original]-to-[model-target].converter.ts`.

### `commands`

CQRS command classes exposing operations of a module.

- Naming: `[operation].command.ts` (example: `save-user.command.ts`).

### `handlers`

CQRS command handlers.

- Naming: `[operation].handler.ts` (example: `save-user.handler.ts`).

### `utils`

Local helper functions/utilities for the module.

- Naming: `[scope].utils.ts` (example: `time.utils.ts`).

## General Rules

- Every directory should expose a barrel file (`index.ts`) with entities intended for the upper layer.
- Use `ports/adapters` when integrating external APIs.
- If multiple features depend on the same external integration abstraction, extract it into a dedicated feature.
- Compose multiple features through `application`, not through direct feature-to-feature coupling.
