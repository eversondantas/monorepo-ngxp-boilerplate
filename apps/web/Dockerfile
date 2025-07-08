# Build stage
FROM node:20-alpine AS build

WORKDIR /usr/src/app

# Copy package files for root and Web workspace
COPY package*.json ./
COPY apps/web/package.json ./apps/web/package.json

# Install dependencies for the Web workspace
RUN npm ci --ignore-scripts --workspace=apps/web

# Copy source code
COPY . .

# Build the application
RUN npm run build:web

# Production stage
FROM nginx:alpine

# Copy built app to nginx
COPY --from=build /usr/src/app/apps/web/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/web/nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1
# Start nginxCMD ["nginx", "-g", "daemon off;"]