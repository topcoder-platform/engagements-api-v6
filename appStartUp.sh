#!/bin/sh
# Apply committed migrations using DATABASE_URL, then start the API. Any
# migration failure exits the container before the API can accept traffic.
set -eu

printf '%s\n' 'Applying engagements database migrations.'
./node_modules/.bin/prisma migrate deploy

printf '%s\n' 'Starting Engagements API v6.'
exec node dist/src/main.js
