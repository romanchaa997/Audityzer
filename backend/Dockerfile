FROM node:20-slim

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm install --frozen-lockfile

COPY . .

CMD ["pnpm", "start"]
