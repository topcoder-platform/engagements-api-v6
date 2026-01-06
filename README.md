# Engagements API v6

Engagements API for managing temporary contract work opportunities.

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma
- pnpm

## Prerequisites

- Node.js 22+
- pnpm

## Getting Started

1. Clone the repository.
2. Install dependencies:

```bash
pnpm install
```

3. Copy `.env.example` to `.env` and update values.
4. Run database migrations:

```bash
pnpm prisma:migrate
```

5. Start the development server:

```bash
pnpm start:dev
```

## Authentication

This API uses JWT authentication for user requests and supports M2M tokens for service-to-service access. Provide a Bearer token with the required scopes for protected endpoints.
