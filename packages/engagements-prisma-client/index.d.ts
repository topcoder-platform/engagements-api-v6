export * from './generated';

import { Prisma, PrismaClient } from './generated';
import type { PoolConfig } from 'pg';

/** Options accepted by the Engagements API external-client factory. */
export type EngagementsPrismaClientOptions = Omit<
  Prisma.PrismaClientOptions,
  'adapter' | 'accelerateUrl'
> & {
  /** PostgreSQL driver pool settings such as connection/query timeouts. */
  driverOptions?: Omit<PoolConfig, 'connectionString'>;
};

/**
 * Creates a lazily connected Prisma client for the Engagements API database.
 *
 * @param connectionString PostgreSQL URL, including an optional Prisma
 * `schema` query parameter.
 * @param options Optional Prisma settings and PostgreSQL driver pool settings.
 * @returns An engagements-schema Prisma client. The caller owns its lifecycle
 * and must call `$disconnect()` during shutdown.
 * @throws TypeError when `connectionString` is not a non-empty string. Prisma
 * may throw its standard configuration or database errors when the client is
 * created or used.
 */
export declare function createEngagementsPrismaClient(
  connectionString: string,
  options?: EngagementsPrismaClientOptions,
): PrismaClient;
