FROM node:16-alpine3.14 AS build-step

WORKDIR /app
COPY package*.json  ./
RUN npm install

COPY . .

CMD [ "node","index.js" ]

#EXPOSE 80