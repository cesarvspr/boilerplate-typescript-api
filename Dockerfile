FROM node:16.8.0-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install -D
COPY . .
RUN npm run build

FROM node:16.8.0-alpine AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production-only

FROM node:16.8.0-alpine
WORKDIR /usr/src/app
ENV TZ=America/Sao_Paulo
ENV DOCKER_CONTAINER=1
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/package.json /usr/src/app/tsconfig.json /usr/src/app/.sequelizerc ./
COPY --from=builder /usr/src/app/db ./db/
COPY --from=deps /usr/src/app/node_modules ./node_modules/
COPY --from=builder /usr/src/app/dist ./dist
RUN chown node:node .
USER node

EXPOSE 3000
CMD ["npm", "start"]
