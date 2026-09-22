# Keep build tooling aligned with the version used by local development.
ARG NODE_VERSION=26.5.1

# ---- Base Stage ----
FROM node:${NODE_VERSION}-alpine AS base
RUN apk upgrade --no-cache
WORKDIR /usr/src/app

# ---- Tooling Stage ----
FROM base AS tooling
# Pin build tooling so dependency resolution remains reproducible.
RUN npm install -g pnpm@11.15.1 prisma@7.8.0

# ---- Dependencies Stage ----
FROM tooling AS deps
# Copy dependency-defining files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Install dependencies
RUN pnpm install --frozen-lockfile
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN DATABASE_URL="postgresql://user:pass@localhost:5432/db?schema=public" pnpm prisma:generate

# ---- Build Stage ----
FROM tooling AS build
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
# Build the application
RUN pnpm build

# ---- Production Dependencies Stage ----
FROM tooling AS prod-deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma
# Install into a clean virtual store so build-only packages are absent from the
# final image, then generate the Prisma client with builder-only tooling.
RUN pnpm install --prod --frozen-lockfile --ignore-scripts \
  && prisma generate --schema prisma/schema.prisma

# ---- Production Stage ----
# Install Alpine's dynamically linked Node.js build so the runtime uses the
# distribution-patched OpenSSL libraries instead of Node's bundled copy.
FROM alpine:3.24 AS production
ARG NODE_VERSION
RUN apk upgrade --no-cache \
  && apk add --no-cache nodejs-current=${NODE_VERSION}-r0 \
  && addgroup -S app \
  && adduser -S -D -H -u 10001 -G app app
WORKDIR /usr/src/app
ENV NODE_ENV=production
# Copy built application from the build stage
COPY --chown=app:app --from=build /usr/src/app/dist ./dist
# Copy production dependencies from the deps stage
COPY --chown=app:app --from=prod-deps /usr/src/app/node_modules ./node_modules

USER app

# Expose the application port
EXPOSE 3000

# The command to run the application
CMD ["node", "dist/src/main.js"]
