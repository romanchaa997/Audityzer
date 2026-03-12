FROM node:20-alpine

WORKDIR /app

# Copy only what the server needs
COPY package.json package-lock.json ./
RUN npm install --production --ignore-scripts 2>/dev/null || npm install --omit=dev --ignore-scripts

COPY server.js ./
COPY src/core/ai-vulnerability-detection.js ./src/core/

EXPOSE 5000

CMD ["node", "server.js"]
