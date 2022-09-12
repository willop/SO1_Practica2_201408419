FROM node:16-alpine3.14 AS build-step

WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


#EXPOSE 80