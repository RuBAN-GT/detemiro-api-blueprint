FROM node:22-bookworm-slim

RUN set -ex; \
  apt-get update -y ; \
  apt-get install -y --no-install-recommends \
  openssl

WORKDIR /workspace

COPY .yarnrc.yml /workspace/.yarnrc.yml
COPY yarn.lock /workspace/yarn.lock
COPY .yarn /workspace/.yarn
COPY package.json /workspace/
COPY tsconfig.json /workspace/
COPY apps/action-manager/package.json /workspace/apps/action-manager/package.json
COPY libs/db-adapter /workspace/libs/db-adapter

RUN corepack enable
RUN yarn install --immutable

RUN yarn workspace detemiro-api-db-adapter build
RUN yarn workspaces focus --all --production

CMD ["yarn", "workspace", "detemiro-api-db-adapter", "db:migrate"]
