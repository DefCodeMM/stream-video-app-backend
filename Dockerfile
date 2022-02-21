FROM node:17-alpine

WORKDIR /workspace/server

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

RUN npm run build