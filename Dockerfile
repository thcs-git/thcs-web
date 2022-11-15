FROM node:16-alpine AS builder

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG PORT=3000
ENV PORT=${PORT}

ARG REACT_APP_CHIPER_KEY
ENV REACT_APP_CHIPER_KEY=${REACT_APP_CHIPER_KEY}

ARG REACT_APP_BASE_API
ENV REACT_APP_BASE_API=${REACT_APP_BASE_API}

ARG REACT_APP_BASE_CHATBOT
ENV REACT_APP_BASE_CHATBOT=${REACT_APP_BASE_CHATBOT}

ARG REACT_APP_BASE_API_MOBI
ENV REACT_APP_BASE_API_MOBI=${REACT_APP_BASE_API_MOBI}

ARG REACT_APP_BASE_API_REPORT
ENV REACT_APP_BASE_API_REPORT=${REACT_APP_BASE_API_REPORT}

ARG REACT_APP_BASE_API_NEXODATA
ENV REACT_APP_BASE_API_NEXODATA=${REACT_APP_BASE_API_NEXODATA}

ARG REACT_APP_BASE_MAP
ENV REACT_APP_BASE_MAP=${REACT_APP_BASE_MAP}

ARG REACT_APP_CORREIOS_API
ENV REACT_APP_CORREIOS_API=${REACT_APP_CORREIOS_API}

ARG REACT_APP_IBGE_API
ENV REACT_APP_IBGE_API=${REACT_APP_IBGE_API}

ARG REACT_APP_VIACEP_API
ENV REACT_APP_VIACEP_API=${REACT_APP_VIACEP_API}

ARG REACT_APP_GOOGLE_API_KEY
ENV REACT_APP_GOOGLE_API_KEY=${REACT_APP_GOOGLE_API_KEY}

ARG REACT_APP_GOOGLE_MAPS_API
ENV REACT_APP_GOOGLE_MAPS_API=${REACT_APP_GOOGLE_MAPS_API}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn --network-timeout 100000

COPY . .

RUN yarn build

FROM nginx:1.23.2-alpine AS runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

COPY package*.json ./

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
