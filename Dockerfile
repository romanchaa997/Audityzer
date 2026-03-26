FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
