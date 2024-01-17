# Install dependencies only when needed
FROM node:18-alpine3.15 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

#Hacer el build de la aplicación
FROM node:16-alpine as development

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig*.json package*.json nest-cli*.json ./
#RUN npm ci
COPY src/ src/
RUN npm run build


#Runtime (production) layer
FROM node:16-alpine as production

WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm ci --omit=dev
COPY --from=development /app/dist ./dist/
EXPOSE 3100
CMD [ "node", "dist/main.js" ]
