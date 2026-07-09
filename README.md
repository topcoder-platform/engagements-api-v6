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

## Configuration

Set the following environment variables (see `.env.example` for defaults):

| Variable | Description |
| --- | --- |
| `PORT` | Port the API listens on. |
| `DATABASE_URL` | PostgreSQL connection string used by Prisma. |
| `AUTH_SECRET` | Shared secret for JWT verification in local/dev scenarios. |
| `VALID_ISSUERS` | JSON array of allowed JWT issuers. |
| `TOPCODER_API_URL_BASE` | Base URL for Topcoder API services. |
| `PLATFORM_UI_BASE_URL` | Platform UI base URL used to generate anonymous feedback links. |
| `FLEXI_TALENT_IGNORED_PROJECT_IDS` | Comma-separated Work project IDs excluded from all Flexi Talent engagement and member responses. |
| `AUTH0_URL` | Auth0 token endpoint for M2M client credentials. |
| `M2M_CLIENT_ID` | Auth0 M2M client ID. |
| `M2M_CLIENT_SECRET` | Auth0 M2M client secret. |
| `AUTH0_AUDIENCE` | Auth0 audience for M2M tokens. |
| `SENDGRID_ASSIGNMENT_OFFER_TEMPLATE_ID` | SendGrid template ID for assignment offer emails. |
| `SENDGRID_ENGAGEMENT_ASSIGNMENT_UPDATED_TEMPLATE_ID` | SendGrid template ID for engagement assignment update emails. |
| `SENDGRID_ASSIGNMENT_OFFER_ACCEPTED_TEMPLATE_ID` | SendGrid template ID for assignment offer accepted emails. |
| `SENDGRID_ASSIGNMENT_OFFER_REJECTED_TEMPLATE_ID` | SendGrid template ID for assignment offer rejected emails. |
| `SENDGRID_UNDER_REVIEW_TEMPLATE_ID` | SendGrid template ID for notifying applicants their application is under review. |
| `SENDGRID_REJECTED_TEMPLATE_ID` | SendGrid template ID for notifying applicants their application was not selected. |

## Authentication

This API uses JWT authentication for user requests and supports M2M tokens for service-to-service access. Provide a Bearer token with the required scopes for protected endpoints.

## Security & Authorization

The API supports both user JWTs and machine-to-machine (M2M) tokens. User tokens are evaluated for roles and scopes, while M2M tokens rely on scopes. Administrators, Topcoder Project Managers, Topcoder Task Managers, and Topcoder Talent Managers have elevated privileges for management operations.

| Scope | Description | Endpoints |
| --- | --- | --- |
| `read:engagements` | View engagement listings and details | `GET /engagements`, `GET /engagements/:id`, `GET /engagements/active` |
| `write:engagements` | Create and update engagements | `POST /engagements`, `PUT /engagements/:id` |
| `manage:engagements` | Full engagement management including deletion | `DELETE /engagements/:id` |
| `read:applications` | View applications | `GET /applications`, `GET /applications/:id`, `GET /engagements/:id/applications` |
| `write:applications` | Submit and update applications | `POST /engagements/:id/applications`, `PATCH /applications/:id/status`, `PATCH /applications/:id/approve` |

## M2M Token Configuration

M2M access uses Auth0 client credentials. Ensure the client is configured with the required scopes for the endpoints it calls. Tokens are validated by `tc-core-library-js` before being processed by the service.

## Role-Based Access

- Administrators, Topcoder Project Managers, Topcoder Task Managers, and Topcoder Talent Managers can bypass scope checks for most management operations.
- Regular members can view public engagements and manage their own applications.
- Assigned members can view the details of their own private engagements.
- Project Managers can view and update application statuses for engagements they created, while Task Managers and Talent Managers can do so across engagements.
- Talent Managers are server-scoped to engagements from projects where they are members when listing engagements.
- Flexi Talent read endpoints are stricter for human tokens: only Administrators and Talent Managers are allowed. M2M callers must include `read:engagements`.

## Response Notes

- `GET /engagements`, `GET /engagements/active`, and `GET /engagements/my-assignments` include project metadata on each engagement record:
  - `projectName` (if available)
  - `project` object with `id` and optional `name`
- `PUT /engagements/:id` rejects project reassignment when the engagement's current project already has a `billingAccountId`.
- Flexi Talent endpoints exclude engagements and member assignment rows whose `projectId` is configured in `FLEXI_TALENT_IGNORED_PROJECT_IDS`.
- Flexi Talent list endpoints return pagination at the top level of the response body instead of the legacy nested `meta` shape:

```json
{
  "data": [],
  "page": 1,
  "perPage": 20,
  "total": 0,
  "totalPages": 0
}
```

## Flexi Talent Read Endpoints

All Flexi Talent routes live under `/engagements/flexi-talent`, require bearer authentication, and use `read:engagements` for M2M callers. Human callers must be Administrators or Talent Managers.

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/engagements/flexi-talent/engagements/summary` | Engagement bucket counts: total, active (`OPEN`/`ACTIVE`), closed (`CLOSED`/`CANCELLED`). |
| `GET` | `/engagements/flexi-talent/engagements` | Flat-paginated engagement list with bucket, title/project-name search, and current assigned-member counts. |
| `GET` | `/engagements/flexi-talent/engagements/:engagementId` | Engagement detail with project name, skill names, and all assignment rows. |
| `GET` | `/engagements/flexi-talent/members/summary` | Assignment-centric unique member counts. |
| `GET` | `/engagements/flexi-talent/members` | Flat-paginated member list grouped by `memberId`, with primary assignment context. |
| `GET` | `/engagements/flexi-talent/members/:memberId` | Member right-rail detail using the same primary-assignment selection as the list. |
| `GET` | `/engagements/flexi-talent/members/:memberId/history` | Full unpaginated member assignment history with current rows first. |
