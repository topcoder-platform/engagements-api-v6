# ---- Base Stage ----
FROM node:22.23.1-alpine AS base
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
FROM base AS production
ENV NODE_ENV=production
RUN rm -rf /usr/local/lib/node_modules/npm \
  && rm -f /usr/local/bin/npm /usr/local/bin/npx
# Copy built application from the build stage
COPY --from=build /usr/src/app/dist ./dist
# Copy production dependencies from the deps stage
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules

# Expose the application port
EXPOSE 3000

# The command to run the application
CMD ["node", "dist/src/main.js"]
