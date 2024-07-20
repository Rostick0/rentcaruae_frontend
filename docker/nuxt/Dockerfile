FROM node:20-alpine AS base
WORKDIR /src

ARG API_URL
ARG BASE_URL
ENV API_URL=$API_URL
ENV HOST=$BASE_URL

FROM base as build
# package-lock.json
COPY package.json  ./
RUN npm install

COPY . .

# RUN npm run generate
RUN npm run build
# RUN npm prune


FROM base

COPY --from=build /src/.output /src/.output


CMD ["node", ".output/server/index.mjs" ] 