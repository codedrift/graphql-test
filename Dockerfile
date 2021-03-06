FROM node:lts-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run lint
RUN npm run test
RUN npm run build

FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /usr/src/app/dist/ dist/
USER node
EXPOSE 3000
ENTRYPOINT ["node", "dist/index.js"]
