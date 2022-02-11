FROM node:17 As development

WORKDIR /workspace/server

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build


FROM node:17 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /workspace/server

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /workspace/server/dist ./dist

CMD ["node", "dist/main"]
