FROM node:18-alpine AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

FROM base AS builder
# Set pnpm global bin
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm
RUN pnpm install -g turbo
COPY . .
RUN turbo prune --scope=loans --docker


# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN npm install -g pnpm
RUN pnpm i --frozen-lockfile
# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
ARG CLIENT_PORT
ENV CLIENT_PORT=${CLIENT_PORT}
ARG LOANS_COLLECTION_V1
ENV LOANS_COLLECTION_V1=${LOANS_COLLECTION_V1}
ARG LOANS_PORT_V1
ENV LOANS_PORT_V1=${LOANS_PORT_V1}
ARG LOANS_DB_PORT_V1
ENV LOANS_DB_PORT_V1=${LOANS_DB_PORT_V1}
ARG LOANS_DB_URI_V1
ENV LOANS_DB_URI_V1=${LOANS_DB_URI_V1}
ARG LOANS_DB_USER_V1
ENV LOANS_DB_USER_V1=${LOANS_DB_USER_V1}
ARG LOANS_DB_PASSWORD_V1
ENV LOANS_DB_PASSWORD_V1=${LOANS_DB_PASSWORD_V1}
RUN pnpm run build --filter=loans...


FROM base AS runner
RUN npm install -g pnpm
COPY --from=installer /app .
ARG CLIENT_PORT
ENV CLIENT_PORT=${CLIENT_PORT}
ARG LOANS_COLLECTION_V1
ENV LOANS_COLLECTION_V1=${LOANS_COLLECTION_V1}
ARG LOANS_PORT_V1
ENV LOANS_PORT_V1=${LOANS_PORT_V1}
ARG LOANS_DB_PORT_V1
ENV LOANS_DB_PORT_V1=${LOANS_DB_PORT_V1}
ARG LOANS_DB_URI_V1
ENV LOANS_DB_URI_V1=${LOANS_DB_URI_V1}
ARG LOANS_DB_USER_V1
ENV LOANS_DB_USER_V1=${LOANS_DB_USER_V1}
ARG LOANS_DB_PASSWORD_V1
ENV LOANS_DB_PASSWORD_V1=${LOANS_DB_PASSWORD_V1}
CMD pnpm run prepare:graph --filter=loans && sh services/loans/start.sh