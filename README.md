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

## Security & Authorization

The API supports both user JWTs and machine-to-machine (M2M) tokens. User tokens are evaluated for roles and scopes, while M2M tokens rely on scopes. Administrators and Topcoder Project Managers have elevated privileges for management operations.

| Scope | Description | Endpoints |
| --- | --- | --- |
| `read:engagements` | View engagement listings and details | `GET /engagements`, `GET /engagements/:id`, `GET /engagements/active` |
| `write:engagements` | Create and update engagements | `POST /engagements`, `PUT /engagements/:id` |
| `manage:engagements` | Full engagement management including deletion | `DELETE /engagements/:id` |
| `read:applications` | View applications | `GET /applications`, `GET /applications/:id`, `GET /engagements/:id/applications` |
| `write:applications` | Submit and update applications | `POST /engagements/:id/applications`, `PATCH /applications/:id/status` |

## M2M Token Configuration

M2M access uses Auth0 client credentials. Ensure the client is configured with the required scopes for the endpoints it calls. Tokens are validated by `tc-core-library-js` before being processed by the service.

## Role-Based Access

- Administrators and Topcoder Project Managers can bypass scope checks for most management operations.
- Regular members can view engagements and manage their own applications.
- Project Managers can view and update application statuses for engagements they own.
