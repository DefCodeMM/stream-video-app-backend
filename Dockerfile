FROM node:17

WORKDIR /workspace/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build