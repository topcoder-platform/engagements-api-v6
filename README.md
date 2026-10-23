# Engagements API v6

Engagements API for managing temporary contract work opportunities.

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma
- pnpm

## Prerequisites

- Node.js 26.5.1 (use the version in `.nvmrc`)
- pnpm 11.15.1

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

## External Prisma client

Services that aggregate engagement data directly can install the
`packages/engagements-prisma-client` Git subdirectory as
`@topcoder/engagements-api-v6`. Generated Prisma files are isolated in its
`generated` directory, so regeneration does not overwrite the public package
contract. The package re-exports all engagement models, enums, Prisma helpers,
and `PrismaClient`, together with the supported factory:

```ts
import { createEngagementsPrismaClient } from '@topcoder/engagements-api-v6';

const engagements = createEngagementsPrismaClient(
  process.env.ENGAGEMENTS_DATABASE_URL,
  { log: ['warn', 'error'] },
);
```

`createEngagementsPrismaClient(connectionString, options?)` creates the Prisma
7 PostgreSQL driver adapter, preserves the optional `schema` query parameter in
the connection URL, and returns a disconnected client that connects lazily on
its first query. Call `$disconnect()` during application shutdown. The factory
throws `TypeError` when `connectionString` is empty or not a string; Prisma may
raise its normal configuration and database errors while creating or using the
client. Connection-defining `adapter` and `accelerateUrl` options are owned by
the factory and intentionally excluded from its options type.

Run the package smoke test without connecting to a database with:

```bash
pnpm test:external-client
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
| `TIMESHEET_IGNORED_PROJECT_IDS` | Comma-separated Work project IDs (e.g. test projects) excluded from the timesheet landing list (`GET /timesheets/engagements`) for every viewer. |
| `USE_KEYCLOAK` | `true` gets M2M tokens from Keycloak (`KEYCLOAK_*`); unset or `false` uses Auth0 (the `AUTH0_*`/`M2M_CLIENT_*` settings). Any other value fails at startup. See [docs/keycloak-m2m.md](docs/keycloak-m2m.md). |
| `AUTH0_URL` | Auth0 token endpoint for M2M client credentials (when `USE_KEYCLOAK` is not `true`). |
| `M2M_CLIENT_ID` | Auth0 M2M client ID (when `USE_KEYCLOAK` is not `true`). |
| `M2M_CLIENT_SECRET` | Auth0 M2M client secret (when `USE_KEYCLOAK` is not `true`). |
| `AUTH0_AUDIENCE` | Auth0 audience for M2M tokens (when `USE_KEYCLOAK` is not `true`). |
| `AUTH0_PROXY_SERVER_URL` | Optional Auth0 proxy used by the Bus client (when `USE_KEYCLOAK` is not `true`). |
| `KEYCLOAK_ISSUER`, `KEYCLOAK_AUDIENCE`, `KEYCLOAK_TOKEN_URL` | Keycloak realm, audience and token endpoint (required when `USE_KEYCLOAK=true`). |
| `KEYCLOAK_CLIENT_ID`, `KEYCLOAK_CLIENT_SECRET` | Keycloak M2M credentials (when `USE_KEYCLOAK=true`); optional `KEYCLOAK_SCOPE` narrows the client's defaults. |
| `SENDGRID_ASSIGNMENT_OFFER_TEMPLATE_ID` | SendGrid template ID for assignment offer emails. |
| `SENDGRID_ENGAGEMENT_ASSIGNMENT_UPDATED_TEMPLATE_ID` | SendGrid template ID for engagement assignment update emails. |
| `SENDGRID_ASSIGNMENT_OFFER_ACCEPTED_TEMPLATE_ID` | SendGrid template ID for assignment offer accepted emails. |
| `SENDGRID_ASSIGNMENT_OFFER_REJECTED_TEMPLATE_ID` | SendGrid template ID for assignment offer rejected emails. |
| `SENDGRID_UNDER_REVIEW_TEMPLATE_ID` | SendGrid template ID for notifying applicants their application is under review. |
| `SENDGRID_REJECTED_TEMPLATE_ID` | SendGrid template ID for notifying applicants their application was not selected. |
| `SENDGRID_TIMESHEET_SUBMITTED_TEMPLATE_ID` | SendGrid template ID for telling engagement managers a timesheet was submitted for approval. |
| `SENDGRID_TIMESHEET_RESUBMISSION_REQUIRED_TEMPLATE_ID` | SendGrid template ID for telling a member that edited submitted entries went back to draft and need resubmitting. |
| `SENDGRID_TIMESHEET_APPROVED_TEMPLATE_ID` | SendGrid template ID for telling a member their timesheet entries were approved. |
| `SENDGRID_TIMESHEET_ADMIN_CHANGED_TEMPLATE_ID` | SendGrid template ID for telling a member an administrator reopened or modified approved entries. |
| `SENDGRID_ENGAGEMENT_MANAGER_ASSIGNED_TEMPLATE_ID` | SendGrid template ID for telling a member they were made a manager of an engagement. |

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

M2M access uses Keycloak client credentials when `USE_KEYCLOAK=true` and Auth0 client credentials otherwise (see [docs/keycloak-m2m.md](docs/keycloak-m2m.md)). Ensure the client is configured with the required scopes for the endpoints it calls. Tokens are validated by `tc-core-library-js` before being processed by the service.

## Role-Based Access

- Administrators, Topcoder Project Managers, Topcoder Task Managers, and Topcoder Talent Managers can bypass scope checks for most management operations.
- Regular members can view public engagements and manage their own applications.
- Assigned members can view the details of their own private engagements.
- Project Managers can view and update application statuses for engagements they created, while Task Managers and Talent Managers can do so across engagements.
- Talent Managers are server-scoped to engagements from projects where they are members when listing engagements.
- Flexi Talent read endpoints are stricter for human tokens: only Administrators and Talent Managers are allowed. M2M callers must include `read:engagements`.

## Response Notes

### Public skill filtering and display names

The public opportunities list accepts standardized skill UUIDs, human-readable
skill names, or a mixture of both:

```http
GET /v6/engagements/engagements?requiredSkills=React,11111111-1111-4111-8111-111111111111&page=1&perPage=20
```

- Supply `requiredSkills` as a comma-separated value or repeated query
  parameter. Up to 20 values are accepted; larger requests receive HTTP 400.
- Values use OR semantics. UUIDs are applied directly. Names must equal a
  standardized skill name after trimming and case normalization; partial and
  fuzzy suggestions are never accepted as filters.
- Name resolution uses server-side M2M credentials and does not require or
  forward a member token. The exact-name request is batched; bounded
  case-insensitive fallback lookups are used only for names not returned by the
  case-sensitive standardized-skills list seam.
- Unknown names and dependency/authentication failures fail closed. An
  all-name request with no resolved IDs returns an empty page without querying
  engagements; in a mixed request, valid UUIDs/resolved names still participate
  in the OR filter.
- Public list, active-list, and detail rows keep `requiredSkills` as the
  backward-compatible ID array and add `skills: [{ "id", "name" }]`. Display
  hydration is batched across a page and is non-fatal; a missing display name
  falls back to its ID. Protected/private response behavior is unchanged.
- Free-text `search` uses OR semantics across title, description, and an exact
  standardized skill name. Role, status, location, and explicit
  `requiredSkills` facets remain independent AND filters.

### Current-user application filter

`GET /engagements?includePrivate=true` includes private engagements for
Administrators, Talent Managers (including Topcoder Talent Managers), and M2M
callers. For other callers, including Project Managers, Task Managers, ordinary
members, and anonymous visitors, the flag is silently ignored and the API returns
HTTP 200 with the normal public engagement list. Pagination and other filters
are preserved, and protected fields and assignments remain excluded.
Explicit `status=ON_HOLD` requests still require private-read access.

The public opportunity list supports an optional current-user filter:

```http
GET /v6/engagements/engagements?appliedByMe=true&page=1&perPage=20
Authorization: Bearer <member JWT>
```

- `appliedByMe=true` requires an authenticated human-user JWT with a user id and
  returns only engagements having an application from that user. Each row adds
  that member's `applicationStatus` without exposing application contact or
  profile data. Anonymous requests receive HTTP 401 and M2M tokens receive
  HTTP 403.
- `appliedByMe=false`, or omitting the parameter, applies no current-user
  filter. Authentication remains optional and the existing public-list privacy,
  status, search, sorting, and pagination behavior is unchanged.
- `includePrivate=true&appliedByMe=true` retains member-scoped access to the
  authenticated member's own private engagements and assignments, including
  `ON_HOLD` engagements. The public fallback does not change this access.
- The response contract remains the normal engagement list shape:

```json
{
  "data": [
    {
      "id": "engagement-id",
      "title": "Frontend developer",
      "applicationStatus": "ACCEPTED",
      "applicationsCount": 3,
      "project": { "id": "project-id", "name": "Example project" },
      "projectName": "Example project"
    }
  ],
  "meta": {
    "page": 1,
    "perPage": 20,
    "totalCount": 1,
    "totalPages": 1
  }
}
```

The existing authenticated `GET /v6/engagements/applications` endpoint remains
the companion route for retrieving the current user's paginated application
records. The engagement-list filter performs its relation check in the same
database query and does not expose another member's application details.

Anonymous and ordinary-member responses from `GET /engagements`,
`GET /engagements/active`, and public `GET /engagements/:id` reads are produced
from an explicit public allow-list. They never include `account`, `smu`, `spoc`,
`receivedDateFromAccount`, `createdByEmail`, or assignment details. Privileged
`includePrivate=true` listings, authorized manager/M2M detail reads, assigned
members reading their own private engagement, and `GET /engagements/my-assignments`
retain the protected fields needed by those workflows.

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
| `GET` | `/engagements/flexi-talent/engagements/summary` | Engagement bucket counts: total (`ACTIVE`/`CLOSED`), active (`ACTIVE`), closed (`CLOSED`). |
| `GET` | `/engagements/flexi-talent/engagements` | Flat-paginated engagement list with bucket, title/project-name search, and current assigned-member counts. |
| `GET` | `/engagements/flexi-talent/engagements/:engagementId` | Engagement detail with project name, skill names, and all assignment rows. |
| `GET` | `/engagements/flexi-talent/members/summary` | Unique member counts from `ASSIGNED` and `COMPLETED` assignments on `ACTIVE`/`CLOSED` engagements. |
| `GET` | `/engagements/flexi-talent/members` | Flat-paginated `ASSIGNED`/`COMPLETED` member list grouped by `memberId`, with primary assignment context. |
| `GET` | `/engagements/flexi-talent/members/:memberId` | Member right-rail detail restricted to qualifying `ASSIGNED`/`COMPLETED` assignments. |
| `GET` | `/engagements/flexi-talent/members/:memberId/history` | Full unpaginated `ASSIGNED`/`COMPLETED` assignment history with current rows first. |

## Assignment acceptance dates

Assignments record `acceptedAt` on the first offer acceptance or administrative
transition to `ASSIGNED`. Later edits, completion, termination, and rejection do
not overwrite it. The Active Members dashboard uses this timestamp so activity
stays in its original UTC month. Run the
`20261019000000_record_assignment_acceptance` migration before deploying this
version. Existing assignments retain null because their true acceptance dates
cannot be recovered from `createdAt` or the mutable `updatedAt`; their application
and payment activity can still appear in reporting.
