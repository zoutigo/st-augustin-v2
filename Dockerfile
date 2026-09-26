# ---- deps ----
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Prisma exige DATABASE_URL même pour `prisma generate`.
ARG DATABASE_URL="mysql://user:pass@localhost:3306/placeholder"
ENV DATABASE_URL=${DATABASE_URL}

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci
RUN npx prisma generate

# ---- builder ----
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

ARG DATABASE_URL="mysql://user:pass@localhost:3306/placeholder"
ENV DATABASE_URL=${DATABASE_URL}
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

# ---- runner ----
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Serveur Node custom (pas de Next standalone : on garde le seed
# ensureDefaultPages/ensureDefaultEntities et les node_modules complets).
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
