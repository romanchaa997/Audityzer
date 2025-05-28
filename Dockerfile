FROM node:20-slim as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN npm ci --omit=dev

CMD ["node", "dist/cli.js"]
