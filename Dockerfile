FROM node:20-alpine

WORKDIR /app

# Install only the deps server.js actually needs
RUN npm install express@4.21.0 cors@2.8.5 prom-client@15.1.0 pg@8.13.0 2>/dev/null

# Copy server
COPY server.js ./

# Railway sets PORT env var
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
