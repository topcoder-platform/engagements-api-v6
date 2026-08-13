export * from './generated';

import { Prisma, PrismaClient } from './generated';

/** Options accepted by the Engagements API external-client factory. */
export type EngagementsPrismaClientOptions = Omit<
  Prisma.PrismaClientOptions,
  'adapter' | 'accelerateUrl'
>;

/**
 * Creates a lazily connected Prisma client for the Engagements API database.
 *
 * @param connectionString PostgreSQL URL, including an optional Prisma
 * `schema` query parameter.
 * @param options Optional Prisma logging, transaction, and omit settings.
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
