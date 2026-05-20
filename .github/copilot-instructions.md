# Copilot instructions for sellbio-back

This file helps Copilot sessions understand how to build, run, test and navigate this repository.

## Build, lint and test (commands)
- Install: npm install
- Build: npm run build
- Start (dev): npm run start:dev
- Start (prod): npm run start:prod
- Lint: npm run lint
- Run full test suite: npm run test
- Run single test file: npm run test -- path/to/file.spec.ts
- Run single test name: npm run test -- -t "test name"
- E2E tests: npm run test:e2e
- Coverage: npm run test:cov
- TypeORM migrations:
  - generate: npm run migration:generate -- <MigrationName>
  - run: npm run migration:run
  - revert: npm run migration:revert

Notes: jest is configured via ts-jest. Jest setup file: test/setup.ts. Tests use the pattern *.spec.ts.

## High-level architecture (summary)
- Framework: NestJS (v11) with TypeScript.
- Architectural style: Hexagonal (ports & adapters). Domain logic is isolated in application and entities; controllers are HTTP adapters and TypeORM implementations live under infra/database.
- Main layers and locations:
  - src/modules/app/{feature}/application: use-cases, services, domain entities (business rules live here)
  - src/modules/app/{feature}/infra/http: controllers, repository interfaces and typeorm adapters
  - src/infra: shared infra (database module, config, constants)
  - src/shared: cross-cutting modules (jwt, bcrypt, etc.)
- Validation and serialization: nestjs-zod with ZodValidationPipe and ZodSerializerInterceptor applied globally (see src/main.ts and AppModule).
- API docs: Swagger served at /docs/api (configured in src/main.ts).
- DB: TypeORM + PostgreSQL; migrations and data source located under src/infra/database.
- Versioning: URI versioning enabled.

## Key conventions and patterns (repository-specific)
- Hexagonal layout per feature: controllers → use-cases/services → entities → repository interface → typeorm repository/mapper. See .github/docs/CONVENTIONS.md for full rules.
- File naming and testing:
  - Tests alongside units: *.spec.ts required for use-cases/services/entities.
  - Use-case files: {action}-{feature}.use-case.ts and tests named accordingly.
- Dependency injection: repository interfaces are exported and bound to TypeORM implementations inside feature modules using provide/useClass.
- Paths aliases: TypeScript path alias `@/src/*` maps to ./src/*; use imports like `@/src/...`.
- DTOs and validation: use Zod schemas for DTOs; validation pipe is global (ZodValidationPipe).
- Migrations: use npm scripts (see above). TypeORM CLI is invoked via npm run typeorm.
- Swagger theme: dark theme applied via swagger-themes; docs available during runtime at /docs/api.
- Environment: dotenv is used; docker-compose.yaml present for local multi-service setups.

## Important files to check quickly
- package.json — scripts, jest config, path aliases
- .github/docs/CONVENTIONS.md — detailed architecture and coding conventions (Portuguese)
- src/main.ts — global app setup (Swagger, validation, versioning)
- src/app.module.ts & src/modules/app/application.module.ts — module composition
- src/infra/database — datasource, migrations
- test/setup.ts — jest test setup

## Other AI / assistant configs found
- .github/docs/CONVENTIONS.md included and should be referenced by Copilot for architecture/conventions.
- No CLAUDE.md, AGENTS.md, .cursorrules, .windsurfrules or AIDER_CONVENTIONS.md detected.

---

If more context is needed for a specific feature or file, open the feature folder under src/modules/app and read its application/ and infra/ subfolders.
