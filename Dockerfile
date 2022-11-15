FROM node:16-alpine AS builder

ARG BUILD_ARG='build:qa'

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn --network-timeout 100000

COPY . .

RUN yarn ${BUILD_ARG}

FROM nginx:1.23.2-alpine AS runner

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

COPY package*.json ./

CMD ["nginx", "-g", "daemon off;"]
