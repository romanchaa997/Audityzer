FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Use custom nginx.conf to listen on port 3000
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"] 