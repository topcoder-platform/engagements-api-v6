# `@topcoder/engagements-api-v6`

This package is the supported external Prisma client for the Engagements API v6
schema. It re-exports the generated Prisma surface and provides
`createEngagementsPrismaClient(connectionString, options?)`, which configures
the Prisma 7 PostgreSQL driver adapter and honors the connection URL's optional
`schema` query parameter.

```ts
import { createEngagementsPrismaClient } from '@topcoder/engagements-api-v6';

const client = createEngagementsPrismaClient(
  process.env.ENGAGEMENTS_DATABASE_URL,
);
const openCount = await client.engagement.count({
  where: { status: 'OPEN', isPrivate: false },
});
await client.$disconnect();
```

The client connects lazily. Applications own its lifecycle and must disconnect
it during shutdown. An empty or non-string connection URL raises `TypeError`;
Prisma reports its normal configuration and database errors during creation or
query execution.
