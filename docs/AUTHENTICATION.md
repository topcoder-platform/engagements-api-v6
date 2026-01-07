# Authentication Reference

## Overview

The Engagements API secures all protected endpoints with bearer tokens. It supports user JWTs for interactive access and machine-to-machine (M2M) tokens for service-to-service communication. Tokens are validated with `tc-core-library-js` and checked for required scopes and roles.

## Authentication Methods

### User JWT

User JWTs are issued by Auth0 and represent a member identity. User tokens can include roles and scopes. Administrators and Topcoder Project Managers have elevated privileges.

### M2M Tokens

M2M tokens are issued via the Auth0 client credentials flow. These tokens do not include a user identity and rely on scopes for authorization.

## Scopes Reference

| Scope | Use Case | Example Endpoints |
| --- | --- | --- |
| `read:engagements` | View engagement listings and details | `GET /engagements`, `GET /engagements/:id`, `GET /engagements/active` |
| `write:engagements` | Create and update engagements | `POST /engagements`, `PUT /engagements/:id` |
| `manage:engagements` | Full engagement management including deletion | `DELETE /engagements/:id` |
| `read:applications` | View applications | `GET /applications`, `GET /applications/:id`, `GET /engagements/:id/applications` |
| `write:applications` | Submit and update applications | `POST /engagements/:id/applications`, `PATCH /applications/:id/status` |

## Role-Based Access

- Administrators and Topcoder Project Managers can bypass scope checks for most management operations.
- Regular members can view engagements and manage their own applications.
- Project Managers can view and update application statuses for engagements they own.

## Code Examples

### cURL with an M2M token

```bash
curl -X GET \
  https://api.topcoder-dev.com/v6/engagements/engagements \
  -H "Authorization: Bearer $M2M_TOKEN"
```

### cURL with a user token

```bash
curl -X POST \
  https://api.topcoder-dev.com/v6/engagements/engagements \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"projectId":"123","title":"AI Engagement","description":"Build an AI demo"}'
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://api.topcoder-dev.com/v6/engagements/engagements", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const payload = await response.json();
console.log(payload);
```

### TypeScript (axios)

```typescript
import axios from "axios";

const response = await axios.get(
  "https://api.topcoder-dev.com/v6/engagements/engagements",
  {
    headers: { Authorization: `Bearer ${token}` },
  },
);

console.log(response.data);
```

### Example token payloads (sanitized)

User JWT payload:

```json
{
  "iss": "https://topcoder-dev.auth0.com/",
  "aud": "https://api.topcoder-dev.com",
  "userId": "123456",
  "handle": "jane_doe",
  "roles": ["Topcoder Project Manager"],
  "scope": "read:engagements write:applications"
}
```

M2M JWT payload:

```json
{
  "iss": "https://topcoder-dev.auth0.com/",
  "aud": "https://api.topcoder-dev.com",
  "gty": "client-credentials",
  "azp": "m2m-client-id",
  "scope": "read:engagements read:applications"
}
```

## Troubleshooting

- `401 Unauthorized`: The token is missing, malformed, or could not be validated.
- `403 Forbidden`: The token is valid but lacks required scopes or roles.
- `404 Not Found`: The requested resource does not exist or is not visible to the caller.

Example error responses:

```json
{
  "message": "You are not authenticated.",
  "statusCode": 401
}
```

```json
{
  "message": "You do not have the required permissions to access this resource.",
  "statusCode": 403
}
```
