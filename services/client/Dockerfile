FROM node:18-alpine AS base
WORKDIR /app

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set pnpm global bin
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
# Set working directory
RUN npm install -g pnpm
RUN pnpm install -g turbo
COPY . .
RUN turbo prune --scope=client --docker


# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
ENV NEXT_TELEMETRY_DISABLED 1
## Install build toolchain, install node deps and compile native add-ons
RUN apk add --no-cache python3 make g++
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm install -g pnpm
RUN pnpm i --frozen-lockfile
# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
ARG NEXT_PUBLIC_ACCOUNTS_PORT_V1
ENV NEXT_PUBLIC_ACCOUNTS_PORT_V1=${NEXT_PUBLIC_ACCOUNTS_PORT_V1}
ARG NEXT_PUBLIC_CUSTOMERS_PORT_V1
ENV NEXT_PUBLIC_CUSTOMERS_PORT_V1=${NEXT_PUBLIC_CUSTOMERS_PORT_V1}
ARG NEXT_PUBLIC_LOANS_PORT_V1
ENV NEXT_PUBLIC_LOANS_PORT_V1=${NEXT_PUBLIC_LOANS_PORT_V1}
ARG NEXT_PUBLIC_REQUESTS_PORT_V1
ENV NEXT_PUBLIC_REQUESTS_PORT_V1=${NEXT_PUBLIC_REQUESTS_PORT_V1}
RUN pnpm run build --filter=client...


FROM base AS runner
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
COPY --from=installer /app/services/client/next.config.js .
COPY --from=installer /app/services/client/package.json .
# Automatically leverage output traces to reduce image size https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/services/client/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/services/client/.next/static ./services/client/.next/static
ARG NEXT_PUBLIC_ACCOUNTS_PORT_V1
ENV NEXT_PUBLIC_ACCOUNTS_PORT_V1=${NEXT_PUBLIC_ACCOUNTS_PORT_V1}
ARG NEXT_PUBLIC_CUSTOMERS_PORT_V1
ENV NEXT_PUBLIC_CUSTOMERS_PORT_V1=${NEXT_PUBLIC_CUSTOMERS_PORT_V1}
ARG NEXT_PUBLIC_LOANS_PORT_V1
ENV NEXT_PUBLIC_LOANS_PORT_V1=${NEXT_PUBLIC_LOANS_PORT_V1}
ARG NEXT_PUBLIC_REQUESTS_PORT_V1
ENV NEXT_PUBLIC_REQUESTS_PORT_V1=${NEXT_PUBLIC_REQUESTS_PORT_V1}
CMD ["node", "services/client/server.js"]