FROM node:23-alpine

ARG APP_MODE=api
ENV NODE_ENV=production
ENV APP_MODE=${APP_MODE}

WORKDIR /workspace

# Generic yarn section
COPY .yarnrc.yml /workspace/.yarnrc.yml
COPY yarn.lock /workspace/yarn.lock
COPY .yarn /workspace/.yarn
COPY package.json /workspace/
COPY tsconfig.json /workspace/

# Monorepo projects
COPY apps/action-manager /workspace/apps/action-manager

# Build
RUN corepack enable
RUN yarn install

RUN yarn workspace detemiro-api-action-manager build

RUN yarn workspaces focus --all --production

CMD ["sh", "-c", "if [ \"$APP_MODE\" = \"worker\" ]; then yarn workspace detemiro-api-action-manager worker:prod; else yarn workspace detemiro-api-action-manager api:prod; fi"]
