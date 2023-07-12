FROM node:18-alpine AS base


FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set pnpm global bin
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
# Set working directory
WORKDIR /app
RUN npm install -g pnpm
RUN pnpm install -g turbo
COPY . .
RUN turbo prune --scope=accounts --docker


# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm install -g pnpm
RUN pnpm i --frozen-lockfile
# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
ARG ACCOUNTS_COLLECTION_V1
ENV ACCOUNTS_COLLECTION_V1=${ACCOUNTS_COLLECTION_V1}
ARG ACCOUNTS_DB_PASSWORD_V1
ENV ACCOUNTS_DB_PASSWORD_V1=${ACCOUNTS_DB_PASSWORD_V1}
ARG ACCOUNTS_DB_PORT_V1
ENV ACCOUNTS_DB_PORT_V1=${ACCOUNTS_DB_PORT_V1}
ARG ACCOUNTS_DB_URI_V1
ENV ACCOUNTS_DB_URI_V1=${ACCOUNTS_DB_URI_V1}
ARG ACCOUNTS_DB_USER_V1
ENV ACCOUNTS_DB_USER_V1=${ACCOUNTS_DB_USER_V1}
ARG ACCOUNTS_PORT_V1
ENV ACCOUNTS_PORT_V1=${ACCOUNTS_PORT_V1}
RUN pnpm run build --filter=accounts...


FROM base AS runner
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .
ARG ACCOUNTS_COLLECTION_V1
ENV ACCOUNTS_COLLECTION_V1=${ACCOUNTS_COLLECTION_V1}
ARG ACCOUNTS_DB_PASSWORD_V1
ENV ACCOUNTS_DB_PASSWORD_V1=${ACCOUNTS_DB_PASSWORD_V1}
ARG ACCOUNTS_DB_PORT_V1
ENV ACCOUNTS_DB_PORT_V1=${ACCOUNTS_DB_PORT_V1}
ARG ACCOUNTS_DB_URI_V1
ENV ACCOUNTS_DB_URI_V1=${ACCOUNTS_DB_URI_V1}
ARG ACCOUNTS_DB_USER_V1
ENV ACCOUNTS_DB_USER_V1=${ACCOUNTS_DB_USER_V1}
ARG ACCOUNTS_PORT_V1
ENV ACCOUNTS_PORT_V1=${ACCOUNTS_PORT_V1}
CMD ["node", "services/accounts/dist/v1/index.js"]