FROM node:alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

WORKDIR /app/src

COPY ./src .

# nginx
# FROM nginx:alpine
# WORKDIR /var/www/html
# COPY --from=build /app/src .
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

ENTRYPOINT [ "node", "index.js" ]