# Timesheet API contract

Agreed contract for the engagement timesheet endpoints, published ahead of implementation so the UI work
can be built in parallel. Sections marked **R2** are stubs for the payment-integration release.

Status: agreed for implementation. Changes after this point need a note in this file and a heads-up to both
the API and UI owners.

See [`TIMESHEET_WORKFLOW.md`](./TIMESHEET_WORKFLOW.md) for the state machine, the role x action matrix, and the
audit and event behaviour.

## Concepts

A **timesheet entry** is one member's hours for one calendar day on one engagement assignment. Entries are
anchored on `engagementAssignmentId`, which already carries `standardHoursPerDay`, `ratePerHour`,
`paymentCycle`, `memberId`, and `memberHandle`.

An **engagement manager** is a person authorized to approve timesheets for an engagement. Authority comes
only from an `EngagementManager` row — never from a JWT role. An engagement can have several managers, and
one manager's approval is final.

### Entry statuses

| Status | Displayed as | Member can edit | Manager can approve |
| --- | --- | --- | --- |
| `DRAFT` | `-` | yes | no |
| `SUBMITTED` | `Submitted` | yes, but the entry resets to `DRAFT` | yes |
| `APPROVED` | `Approved` | no | no, already approved |

There is deliberately no rejection status. A manager who disagrees asks the member to edit the entry, which
resets it to `DRAFT`, or escalates to an administrator.

### `viewerRole`

Every timesheet response carries `viewerRole`, resolved server-side per assignment:

| Value | Meaning |
| --- | --- |
| `MEMBER` | the caller is the assignee |
| `MANAGER` | the caller has a live `EngagementManager` row for the assignment's engagement |
| `ADMINISTRATOR` | the caller holds a privileged platform role, or is a machine token with `manage:timesheets` |

Clients render from this value. They must not infer the view from JWT roles: the page is one route for all
three roles, and the server is the only thing that decides what the caller is.

A caller with none of those relationships receives **`404`**, not `403` — a `403` would confirm that the
assignment exists and let assignment ids be enumerated.

Note the asymmetry: the privileged platform roles (`Administrator`, `Topcoder Project Manager`,
`Topcoder Task Manager`, `Topcoder Talent Manager`) resolve to `ADMINISTRATOR`, never to `MANAGER`. A platform
manager who is not assigned to an engagement therefore acts through the administrator path: their mutations
require an override reason and are audited as `ADMIN_OVERRIDE`.

## Scopes

| Scope | Used by |
| --- | --- |
| `read:timesheets` | entry and list reads |
| `write:timesheets` | entry upsert, submit |
| `approve:timesheets` | approve |
| `manage:timesheets` | administrator override, reopen, manager assignment, payment linkage |

## Endpoints

### `GET /engagements/:engagementId/assignments/:assignmentId/timesheets`

Read entries plus the header data every view shows.

Query: `fromDate`, `toDate` (`YYYY-MM-DD`), `status` (`DRAFT` | `SUBMITTED` | `APPROVED`).

```json
{
  "viewerRole": "MEMBER",
  "engagementId": "4c4dd8a7-2f5a-4f6d-8f7b-1d2c3b4a5e6f",
  "engagementTitle": "Senior Frontend Engineer",
  "assignment": {
    "id": "9a9a5f4d-2a3b-4e9c-9f1c-2b3c4d5e6f7a",
    "memberId": "1001",
    "memberHandle": "johnsmith",
    "memberName": "John Smith",
    "status": "ASSIGNED",
    "standardHoursPerDay": 8,
    "startDate": "2026-09-01T00:00:00.000Z",
    "endDate": "2026-09-30T00:00:00.000Z"
  },
  "managers": [
    { "userId": "2002", "handle": "maryj", "name": "Mary Jones" },
    { "userId": "2003", "handle": "robertl", "name": "Robert Lee" }
  ],
  "entries": [
    {
      "id": "...",
      "workDate": "2026-09-07",
      "hoursWorked": "8.50",
      "remarks": "Sprint planning and API work",
      "status": "APPROVED",
      "submittedAt": "2026-09-08T09:12:00.000Z",
      "approvedByHandle": "maryj",
      "approvedAt": "2026-09-12T10:04:11.000Z",
      "approvalComment": "Approved for week 37",
      "reopenedAt": null,
      "outsideAssignmentWindow": false,
      "isPaid": false
    }
  ]
}
```

- `hoursWorked` is a **string** on the wire. It is a `DECIMAL(5,2)` in the database; sending it as a JSON
  number would put it through a float on the way to a payment amount.
- `workDate` is `YYYY-MM-DD` in every payload. `DD-MM-YYYY` is a display format and belongs only in the UI.
- Approval details on an approved entry are visible to **any** assigned manager, not only the approver.
- `managers` lists every currently assigned manager; members need it for their timesheet header.

### `PUT /engagements/:engagementId/assignments/:assignmentId/timesheets/entries`

Bulk upsert, keyed on `(assignmentId, workDate)`. There is no endpoint that pre-creates empty rows for a date
range: the UI generates the visible rows for a picked range in the browser and sends only the ones the member
filled in, so a row existing means someone entered hours for that day.

```json
{
  "entries": [
    { "workDate": "2026-09-07", "hoursWorked": "8.50", "remarks": "..." },
    { "workDate": "2026-09-08", "hoursWorked": "8", "remarks": null }
  ],
  "overrideReason": "optional, administrators only"
}
```

**The resulting status is derived server-side by comparing stored values to incoming values. Any status the
client sends is ignored**, so a stale client cannot talk the server into an illegal state.

| Stored | Incoming change | Result |
| --- | --- | --- |
| *(none)* | valid entry | created as `DRAFT`, audit `CREATED` |
| `DRAFT` | any | stays `DRAFT`, audit `UPDATED` |
| `SUBMITTED` | `hoursWorked` or `remarks` differs | → `DRAFT`, `submittedAt`/`submittedBy` cleared, audit `UNSUBMITTED` |
| `SUBMITTED` | no material change | no-op, no audit record |
| `APPROVED` | member or manager caller | `409` |
| `APPROVED` | administrator **with** `overrideReason` | applied, audit `ADMIN_OVERRIDE` |
| `APPROVED` | administrator **without** `overrideReason` | `400` |

A transition on one entry never affects its siblings in the same request.

Validation: numeric and decimal hours accepted (`8`, `8.5`, `9.5`); negatives rejected; more than 24 hours on
one day rejected; a range over 31 days rejected; `toDate` before `fromDate` rejected; the same `workDate`
twice in one payload rejected (`400`). Entries outside the assignment's `startDate`/`endDate` are allowed but
returned with `outsideAssignmentWindow: true` so the administrator view can flag them.

### `POST /engagements/:engagementId/assignments/:assignmentId/timesheets/submit`

```json
{ "entryIds": ["..."], "overrideReason": "administrators only" }
```

Only `DRAFT` entries with valid hours become `SUBMITTED`, recording `submittedAt` and `submittedBy`. An entry
missing required data is reported per entry and **nothing partially submits** — the call is atomic. An
administrator may submit on behalf of a member, with a reason. Audit: `SUBMITTED` per entry.

### `POST /engagements/:engagementId/assignments/:assignmentId/timesheets/approve`

```json
{ "entryIds": ["..."], "approvalComment": "required" }
```

Implemented as one conditional bulk update guarded on `status = SUBMITTED`, which is the entire concurrency
control. Partial success is normal and is reported rather than failing the batch:

```json
{
  "approved": ["entry1", "entry2", "entry3"],
  "skipped": [
    { "id": "entry4", "currentStatus": "APPROVED", "approvedByHandle": "maryj" },
    { "id": "entry5", "currentStatus": "DRAFT" }
  ]
}
```

Two managers approving the same entries at the same moment therefore produce exactly one approval per entry,
and the loser is told who got there first. The approval comment is required. Members get `404`. An
administrator approving on behalf of a manager must send `overrideReason`. Audit: `APPROVED` per entry,
carrying the comment.

### `POST /engagements/:engagementId/assignments/:assignmentId/timesheets/reopen`

Administrators only. `{ "entryIds": ["..."], "overrideReason": "required" }`.

Sets `status = DRAFT` and `reopenedAt`, clears `approvedAt`/`approvedBy`/`approvedByHandle`/
`approvalComment`. Audit `REOPENED` preserves the previous values and status.

A reopened entry returns to `DRAFT` rather than gaining a fourth status; `reopenedAt` is what the UI badges
`Reopened` from.

### `GET /engagements/:engagementId/assignments/:assignmentId/timesheets/entries/:entryId/audit`

Administrators only. Returns the entry's recorded changes, newest first.

```json
[
  {
    "id": "...",
    "action": "ADMIN_OVERRIDE",
    "previousValues": { "hoursWorked": "8.00", "status": "APPROVED" },
    "updatedValues": { "hoursWorked": "9.00", "status": "APPROVED" },
    "actorUserId": "3003",
    "actorHandle": "adminuser",
    "actorRole": "ADMINISTRATOR",
    "comment": "Corrected after payroll query",
    "createdAt": "2026-09-14T11:02:00.000Z"
  }
]
```

Members and managers get `403`. The trail records who overrode whose work and why, which is an
administrator's concern rather than something to show the people being audited.

### `GET /timesheets/engagements`

The role-aware landing list. Paginated per the repo's `pagination.dto.ts`.

Query (administrators): `title`, `assignee`, `manager`, `status`, `fromDate`, `toDate`, `page`, `perPage`.

```json
{
  "data": [
    {
      "engagementId": "...",
      "engagementTitle": "Senior Frontend Engineer",
      "assignmentId": "...",
      "assigneeId": "1001",
      "assigneeHandle": "johnsmith",
      "assigneeName": "John Smith",
      "timesheetStatus": "Pending Approval",
      "viewerRole": "MANAGER"
    }
  ],
  "meta": {
    "page": 1,
    "perPage": 20,
    "totalCount": 1,
    "totalPages": 1,
    "viewerRole": "MANAGER"
  }
}
```

A manager sees only engagements where they hold live approval authority; an administrator sees all eligible
engagements. "Eligible" means an assignment that is still active or one that already has entries - a rejected
offer with no entries has no timesheet to manage. One record per (engagement, assignee) pair. `timesheetStatus`
is `Pending Approval` when the assignee has any `SUBMITTED` entry, otherwise `Approved`.

### `GET /engagements/:id/managers`

`[{ "userId": "2002", "handle": "maryj", "name": "Mary Jones" }]` — currently assigned managers, excluding
removed ones. Readable by an administrator, by a manager of that engagement, and by an assigned member.

### `POST /engagements/:id/managers`

```json
{ "userId": "2002", "handle": "maryj", "name": "Mary Jones" }
```

Administrators only. `userId` is required and is what approval authority is keyed on; `handle` and `name` are
denormalized display values.

Both front ends pick the manager from the platform member autocomplete, so they hold the resolved member and
send all three fields — the server then does **no member-API lookup**. A caller that sends `userId` alone has
the handle resolved server-side by id (the stored handle cannot be empty); an id with no resolvable handle →
`400`.

A duplicate assignment → `409` with no second row. Re-adding a previously removed manager clears `removedAt`
on the existing row rather than inserting. Audit `MANAGER_ASSIGNED`.

A supplied handle is trusted as-is. Authority is keyed on `userId`, so a fabricated id grants nobody anything
and a wrong handle is only a mislabelled row; the endpoint is administrator-only, and the duplicate rule is a
database constraint rather than a consequence of the lookup.

### `DELETE /engagements/:id/managers/:managerUserId`

Administrators only. Soft-deletes by setting `removedAt`/`removedBy`. Takes effect on the manager's next
request. Audit `MANAGER_REMOVED`.

### `GET /engagements/:engagementId/assignments/:assignmentId/timesheets/summary` — **R2**

```json
{
  "totalDays": 5,
  "totalHours": "42.50",
  "ratePerHour": "45.00",
  "entryIds": ["..."],
  "alreadyPaidEntryIds": ["..."]
}
```

`APPROVED` entries only. Entries already consumed by a payment are excluded from the totals and `entryIds`,
and listed in `alreadyPaidEntryIds` so the UI can explain a shortfall. Administrators and managers only.

### `POST /engagements/:engagementId/assignments/:assignmentId/timesheets/entries/payments` — **R2**

`{ "entryIds": ["..."], "paymentReference": "..." }`. Stamps `paidPaymentReference`/`paidAt` and writes
`PAYMENT_LINKED` audit records. An entry already carrying a reference is rejected and the whole call is
atomic — this is what prevents the same approved hours being paid twice. Non-approved entries are rejected.

## Error semantics

| Code | When |
| --- | --- |
| `400` | validation failure; administrator mutation missing `overrideReason`; duplicate `workDate` in a payload |
| `401` | no or invalid token |
| `403` | authenticated, but the scope or role does not permit the action on a timesheet the caller can otherwise see |
| `404` | the caller has no relationship to the assignment, **or** it does not exist — deliberately indistinguishable |
| `409` | editing an `APPROVED` entry as a member or manager; duplicate manager assignment |

Error bodies follow the repo's existing shape (`statusCode`, `message`, `error`).

## Audit trail

Every mutation writes an `EngagementTimesheetAudit` record **inside the same transaction as the change**.
Each record carries the action, previous and updated values, previous and updated statuses, the actor's user
id, handle, and role (`MEMBER` | `MANAGER` | `ADMINISTRATOR` | `MACHINE`), the timestamp, and the approval
comment or override reason.

One table holds the whole domain's trail. Entry-scoped rows carry `timesheetEntryId`; manager assignment and
removal are engagement-scoped and carry `engagementId` instead. Exactly one of the two is set on every row,
enforced by a database check constraint.

Decimal values are recorded as exact strings, not floats.
