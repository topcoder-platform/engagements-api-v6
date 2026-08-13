'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const {
  EngagementStatus,
  createEngagementsPrismaClient,
} = require('./index');

/**
 * Verifies the packaged factory exposes the generated engagements schema
 * without opening a database connection.
 *
 * @returns {Promise<void>} Resolves after the client pool is closed.
 * @throws AssertionError when the public package contract is incomplete.
 */
test('creates an Engagements Prisma client with generated exports', async () => {
  const client = createEngagementsPrismaClient(
    'postgresql://user:password@localhost:5432/engagements?schema=engagements',
  );

  assert.equal(typeof client.engagement.count, 'function');
  assert.equal(EngagementStatus.OPEN, 'OPEN');
  await client.$disconnect();
});

/**
 * Verifies invalid configuration fails before a driver or pool is created.
 *
 * @returns {void} This synchronous assertion has no return value.
 * @throws AssertionError when the factory accepts an empty connection URL.
 */
test('rejects an empty Engagements database connection string', () => {
  assert.throws(
    () => createEngagementsPrismaClient(''),
    /Engagements database connection string is required/,
  );
});

/**
 * Verifies driver timeout options reach the factory-owned PostgreSQL adapter
 * without being forwarded as invalid generated PrismaClient options.
 *
 * @returns {Promise<void>} Resolves after the client is disconnected.
 * @throws AssertionError when the adapter does not retain the driver options.
 */
test('passes bounded driver options to the PostgreSQL adapter', async () => {
  const client = createEngagementsPrismaClient(
    'postgresql://user:password@localhost:5432/engagements?schema=public',
    {
      driverOptions: {
        connectionTimeoutMillis: 2500,
        query_timeout: 4000,
        statement_timeout: 4000,
      },
    },
  );

  assert.deepEqual(client._engineConfig.adapter.config, {
    connectionString:
      'postgresql://user:password@localhost:5432/engagements?schema=public',
    connectionTimeoutMillis: 2500,
    query_timeout: 4000,
    statement_timeout: 4000,
  });
  await client.$disconnect();
});
