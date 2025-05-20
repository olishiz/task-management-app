# Multi-stage build for React frontend

# Build stage
FROM node:20-slim AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Production stage using Nginx to serve static files
FROM nginx:stable-alpine AS production

# Copy custom nginx configuration
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

# Expose the port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
