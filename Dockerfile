FROM node:20-alpine AS build

WORKDIR /usr/app
COPY package*.json ./
RUN npm ci
ENV GENERATE_SOURCEMAP=false
COPY . .
RUN npm run build

FROM nginx:stable-alpine3.17-slim
EXPOSE 8080
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*/test

